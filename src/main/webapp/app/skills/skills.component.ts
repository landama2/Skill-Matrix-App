import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
// import {ISkillMySuffix} from "app/shared/model/skill-my-suffix.model";
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
// import {SkillMySuffixService} from "app/entities/skill-my-suffix/skill-my-suffix.service";
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import {SkillMySuffixDeleteDialogComponent} from "app/entities/skill-my-suffix/skill-my-suffix-delete-dialog.component";
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { SkillsService } from 'app/skills/skills.service';
import { SkillLevelMySuffixService } from 'app/entities/skill-level-my-suffix/skill-level-my-suffix.service';
import { ISkill } from 'app/skills/skills.model';
import { ISkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';
import { ICategoryMySuffix } from 'app/shared/model/category-my-suffix.model';
import { ISubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';
import { ISkillMySuffix, SkillMySuffix } from 'app/shared/model/skill-my-suffix.model';

type SelectableEntity = ISkillLevelMySuffix;

@Component({
  selector: 'jhi-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['skills.scss']
  // ,
  // providers: [SkillsService]
})
export class SkillsComponent implements OnInit, OnDestroy {
  // account: Account | null = null;
  // authSubscription?: Subscription;
  // skills?: ISkillMySuffix[];
  skills?: ISkill[];
  skillLevels?: ISkillLevelMySuffix[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected skillService: SkillsService,
    protected skillLevelMySuffixService: SkillLevelMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  // constructor(private accountService: AccountService, private loginModalService: LoginModalService) {}
  //
  // ngOnInit(): void {
  //   this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  // }

  ngOnInit(): void {
    // console.log("on init...")

    this.predicate = 'id';
    this.activatedRoute.data.subscribe(data => {
      // if (data instanceof RoutesRecognized) {
      //   const routeData = data.state.root.firstChild!.data;
      //   this.page = routeData.pagingParams.page;
      //   this.ascending = routeData.pagingParams.ascending;
      //   this.predicate = routeData.pagingParams.predicate;
      //   this.ngbPaginationPage = routeData.pagingParams.page;
      // } else {
      //   this.page = data.pagingParams.page;
      //   this.ascending = data.pagingParams.ascending;
      //   this.predicate = data.pagingParams.predicate;
      //   this.ngbPaginationPage = data.pagingParams.page;
      // }
      this.loadPage();
    });
    this.registerChangeInSkills();
    // console.log("init done...")
  }

  loadPage(page?: number): void {
    // console.log("loading page...")
    // console.log(page);
    // const pageToLoad: number = page || this.page;
    // const pageToLoad: number = 1;
    const pageToLoad = 1;

    this.skillService
      .query({
        page: pageToLoad - 1,
        // size: this.itemsPerPage,
        size: 5,
        sort: this.sort()
      })
      .subscribe(
        // (res: HttpResponse<ISkillMySuffix[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        (res: HttpResponse<ISkill[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );

    this.skillLevelMySuffixService
      .query({
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ISkillLevelMySuffix[]>) => this.onSuccessSkillLevel(res.body, res.headers),
        () => this.onError()
      );
  }

  // isAuthenticated(): boolean {
  //   return this.accountService.isAuthenticated();
  // }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  // trackId(index: number, item: ISkillMySuffix): number {
  trackId(index: number, item: ISkill): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSkills(): void {
    this.eventSubscriber = this.eventManager.subscribe('skillListModification', () => this.loadPage());
  }

  // delete(skill: ISkillMySuffix): void {
  //   const modalRef = this.modalService.open(SkillMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
  //   modalRef.componentInstance.skill = skill;
  // }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  // protected onSuccess(data: ISkillMySuffix[] | null, headers: HttpHeaders, page: number): void {
  protected onSuccess(data: ISkill[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    // this.router.navigate(['/skills'], {
    //   queryParams: {
    //     page: this.page,
    //     size: this.itemsPerPage,
    //     sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
    //   }
    // });
    this.skills = data || [];
  }

  protected onSuccessSkillLevel(data: ISkillLevelMySuffix[] | null, headers: HttpHeaders): void {
    this.skillLevels = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
  // login(): void {
  //   this.loginModalService.open();
  // }

  // ngOnDestroy(): void {
  //   if (this.authSubscription) {
  //     this.authSubscription.unsubscribe();
  //   }
  // }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  //TODO make this work for this page

  // save(): void {
  //   this.isSaving = true;
  //   const skill = this.createFromForm();
  //   if (skill.id !== undefined) {
  //     this.subscribeToSaveResponse(this.skillService.update(skill));
  //   } else {
  //     this.subscribeToSaveResponse(this.skillService.create(skill));
  //   }
  // }
  //
  // private createFromForm(): ISkillMySuffix {
  //   return {
  //     ...new SkillMySuffix(),
  //     id: this.editForm.get(['id'])!.value,
  //     name: this.editForm.get(['name'])!.value,
  //     categoryId: this.editForm.get(['categoryId'])!.value,
  //     subCategoryId: this.editForm.get(['subCategoryId'])!.value
  //   };
  // }
}
