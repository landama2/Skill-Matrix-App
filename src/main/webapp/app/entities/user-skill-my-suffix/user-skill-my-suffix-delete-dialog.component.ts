import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';
import { UserSkillMySuffixService } from './user-skill-my-suffix.service';

@Component({
  templateUrl: './user-skill-my-suffix-delete-dialog.component.html'
})
export class UserSkillMySuffixDeleteDialogComponent {
  userSkill?: IUserSkillMySuffix;

  constructor(
    protected userSkillService: UserSkillMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userSkillService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userSkillListModification');
      this.activeModal.close();
    });
  }
}
