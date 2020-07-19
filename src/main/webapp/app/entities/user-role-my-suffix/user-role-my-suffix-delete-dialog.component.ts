import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserRoleMySuffix } from 'app/shared/model/user-role-my-suffix.model';
import { UserRoleMySuffixService } from './user-role-my-suffix.service';

@Component({
  templateUrl: './user-role-my-suffix-delete-dialog.component.html'
})
export class UserRoleMySuffixDeleteDialogComponent {
  userRole?: IUserRoleMySuffix;

  constructor(
    protected userRoleService: UserRoleMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userRoleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userRoleListModification');
      this.activeModal.close();
    });
  }
}
