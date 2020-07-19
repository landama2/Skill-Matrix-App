import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';
import { SkillLevelMySuffixService } from './skill-level-my-suffix.service';
import { SkillLevelMySuffixDeleteDialogComponent } from './skill-level-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-skill-level-my-suffix',
  templateUrl: './skill-level-my-suffix.component.html'
})
export class SkillLevelMySuffixComponent implements OnInit, OnDestroy {
  skillLevels?: ISkillLevelMySuffix[];
  eventSubscriber?: Subscription;

  constructor(
    protected skillLevelService: SkillLevelMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.skillLevelService.query().subscribe((res: HttpResponse<ISkillLevelMySuffix[]>) => (this.skillLevels = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSkillLevels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISkillLevelMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSkillLevels(): void {
    this.eventSubscriber = this.eventManager.subscribe('skillLevelListModification', () => this.loadAll());
  }

  delete(skillLevel: ISkillLevelMySuffix): void {
    const modalRef = this.modalService.open(SkillLevelMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.skillLevel = skillLevel;
  }
}
