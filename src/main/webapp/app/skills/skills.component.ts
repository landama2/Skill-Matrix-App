import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { SkillsService } from 'app/skills/skills.service';
import { SkillLevelMySuffixService } from 'app/entities/skill-level-my-suffix/skill-level-my-suffix.service';
import { ISkill } from 'app/skills/skills.model';
import { ISkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';

type SelectableEntity = ISkillLevelMySuffix;

@Component({
  selector: 'jhi-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['skills.scss']
  // ,
  // providers: [SkillsService]
})
export class SkillsComponent implements OnInit, OnDestroy {
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

  ngOnInit(): void {
    this.predicate = 'id';
    this.activatedRoute.data.subscribe(data => {
      this.loadPage();
    });
    this.registerChangeInSkills();
  }

  loadPage(page?: number): void {
    const pageToLoad = 1;

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

    this.skillLevelMySuffixService
      .query({
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ISkillLevelMySuffix[]>) => this.onSuccessSkillLevel(res.body, res.headers),
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
