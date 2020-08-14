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
import { map, startWith } from 'rxjs/operators';
import { SkillsSearchService } from 'app/skills-search/skills-search.service';
import { ISkillSearch } from 'app/skills-search/skills-search.model';

type SelectableEntity = ISkillLevelMySuffix;

export interface User {
  name: string;
}

@Component({
  selector: 'jhi-skills-search',
  templateUrl: './skills-search.component.html',
  styleUrls: ['skills-search.scss']
})
export class SkillsSearchComponent implements OnInit, OnDestroy {
  skills?: ISkill[];
  userSkills?: ISkillSearch[];
  skillLevels?: ISkillLevelMySuffix[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  myControl = new FormControl();
  ngbPaginationPage = 1;
  filteredOptions!: Observable<ISkill[]>;

  constructor(
    protected skillService: SkillsService,
    protected skillsSearchService: SkillsSearchService,
    protected skillLevelMySuffixService: SkillLevelMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.predicate = 'id';
    this.activatedRoute.data.subscribe(data => {
      this.loadPage();
    });
    this.registerChangeInSkills();
  }

  private _filter(value: string): ISkill[] {
    const filterValue = this._normalizeValue(value);
    return this.skills!.filter(skill => this._normalizeValue(skill.name!).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserSkillMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {}

  protected onSaveError(): void {}

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

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.skills!.slice()))
    );

    this.myControl.valueChanges.subscribe(value => {
      if (this.skills) {
        const names = this.skills.map(option => option.name);
        if (names.includes(value)) {
          this.skillsSearchService.query2(value).subscribe((res: HttpResponse<ISkillSearch[]>) => (this.userSkills = res.body || []));
        }
      }
    });
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
