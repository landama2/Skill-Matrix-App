import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';
import { UserSkillMySuffixService } from './user-skill-my-suffix.service';
import { UserSkillMySuffixDeleteDialogComponent } from './user-skill-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-user-skill-my-suffix',
  templateUrl: './user-skill-my-suffix.component.html'
})
export class UserSkillMySuffixComponent implements OnInit, OnDestroy {
  userSkills?: IUserSkillMySuffix[];
  eventSubscriber?: Subscription;

  constructor(
    protected userSkillService: UserSkillMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userSkillService.query().subscribe((res: HttpResponse<IUserSkillMySuffix[]>) => (this.userSkills = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserSkills();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserSkillMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserSkills(): void {
    this.eventSubscriber = this.eventManager.subscribe('userSkillListModification', () => this.loadAll());
  }

  delete(userSkill: IUserSkillMySuffix): void {
    const modalRef = this.modalService.open(UserSkillMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userSkill = userSkill;
  }
}
