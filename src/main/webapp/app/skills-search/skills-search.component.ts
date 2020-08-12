import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { SkillsService } from 'app/skills/skills.service';
import { SkillLevelMySuffixService } from 'app/entities/skill-level-my-suffix/skill-level-my-suffix.service';
import { ISkill } from 'app/skills/skills.model';
import { ISkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { IUserSkillMySuffix, UserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';
import { logger } from 'codelyzer/util/logger';
import { UserSkillMySuffixService } from 'app/entities/user-skill-my-suffix/user-skill-my-suffix.service';
import { map, startWith } from 'rxjs/operators';
// import {startWith} from "@angular/cdk/typings/rxjs";
// import {map, startWith} from "@angular/cdk/rxjs";
// import {map, startWith} from "rxjs/operators";
// import {MatAutocompleteModule} from "@angular/material/autocomplete";
// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';

type SelectableEntity = ISkillLevelMySuffix;

export interface User {
  name: string;
}

@Component({
  selector: 'jhi-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['skills.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
  skills?: ISkill[];
  userSkills?: IUserSkillMySuffix[];
  skillLevels?: ISkillLevelMySuffix[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  // filteredOptions!: Observable<ISkill[]>;
  myControl = new FormControl();
  ngbPaginationPage = 1;

  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredOptions!: Observable<User[]>;

  // public skillsForm!: FormGroup;

  constructor(
    protected skillService: SkillsService,
    protected skillLevelMySuffixService: SkillLevelMySuffixService,
    protected userSkillService: UserSkillMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.skills = [];

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value.name),
    //     map(name => name ? this._filter(name) : this.skills!.slice())
    //   );

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     // map((value: string) => {
    //     map(value => {
    //       // const filterValue = value.toLowerCase();
    //       //
    //       // return this.skills!.filter(skill => skill.name!.toLowerCase().includes(filterValue));
    //       // return this._filter(value);
    //     })
    //   );
    this.predicate = 'id';
    this.activatedRoute.data.subscribe(data => {
      this.loadPage();
    });
    this.registerChangeInSkills();
  }

  // private _filter(value: string): ISkill[] {
  //   const filterValue = value.toLowerCase();
  //
  //   // return this.skills!.filter(skill => skill.name!.toLowerCase().includes(filterValue));
  //   // return this.skills!.filter(option => option.name!.toLowerCase().indexOf(filterValue) === 0);
  //   return this.skills!.filter(option => option.name!.toLowerCase().startsWith(filterValue));
  // }
  //
  // displayFn(skill: ISkill): string {
  //   return skill && skill.name ? skill.name : 'abc';
  // }

  displayFn(user: User): string {
    return user && user.name ? user.name : 'defaultUserName';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().startsWith(filterValue));
  }

  onSubmit(): void {
    // console.log(this.usersForm.value);
    this.userSkills = [];
    this.skills?.forEach(value => {
      const userSkillMySuffix = this.createFromTableRow(value);
      logger.info('Adding user skill ...' + userSkillMySuffix.skillId);

      this.userSkills!.push(userSkillMySuffix); //TODO remove this array as its for check only

      this.subscribeToSaveResponse(this.userSkillService.createForCurrentUser(userSkillMySuffix));
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserSkillMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {}

  protected onSaveError(): void {}

  private createFromTableRow(skillRow: ISkill): IUserSkillMySuffix {
    const today = moment().startOf('day');
    return {
      ...new UserSkillMySuffix(),
      changedAt: today,
      userId: 3,
      skillLevelId: skillRow.skillLevel?.id,
      skillId: skillRow.id
    };
  }

  loadPage(page?: number): void {
    const pageToLoad = 1;

    this.skillLevelMySuffixService
      .query({
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ISkillLevelMySuffix[]>) => this.onSuccessSkillLevel(res.body, res.headers),
        () => this.onError()
      );

    this.skillService
      .query({
        page: pageToLoad - 1,
        size: 5,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ISkill[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISkill): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSkills(): void {
    this.eventSubscriber = this.eventManager.subscribe('skillListModification', () => this.loadPage());
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ISkill[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.skills = data || [];
  }

  protected onSuccessSkillLevel(data: ISkillLevelMySuffix[] | null, headers: HttpHeaders): void {
    this.skillLevels = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
