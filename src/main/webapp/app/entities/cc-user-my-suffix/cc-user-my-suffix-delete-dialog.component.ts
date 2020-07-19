import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';
import { CCUserMySuffixService } from './cc-user-my-suffix.service';

@Component({
  templateUrl: './cc-user-my-suffix-delete-dialog.component.html'
})
export class CCUserMySuffixDeleteDialogComponent {
  cCUser?: ICCUserMySuffix;

  constructor(
    protected cCUserService: CCUserMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cCUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cCUserListModification');
      this.activeModal.close();
    });
  }
}
