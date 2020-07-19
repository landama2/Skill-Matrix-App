import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserRoleMySuffix } from 'app/shared/model/user-role-my-suffix.model';
import { UserRoleMySuffixService } from './user-role-my-suffix.service';
import { UserRoleMySuffixDeleteDialogComponent } from './user-role-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-user-role-my-suffix',
  templateUrl: './user-role-my-suffix.component.html'
})
export class UserRoleMySuffixComponent implements OnInit, OnDestroy {
  userRoles?: IUserRoleMySuffix[];
  eventSubscriber?: Subscription;

  constructor(
    protected userRoleService: UserRoleMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userRoleService.query().subscribe((res: HttpResponse<IUserRoleMySuffix[]>) => (this.userRoles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserRoles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserRoleMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserRoles(): void {
    this.eventSubscriber = this.eventManager.subscribe('userRoleListModification', () => this.loadAll());
  }

  delete(userRole: IUserRoleMySuffix): void {
    const modalRef = this.modalService.open(UserRoleMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userRole = userRole;
  }
}
