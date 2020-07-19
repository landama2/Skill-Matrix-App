import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISkillMySuffix } from 'app/shared/model/skill-my-suffix.model';
import { SkillMySuffixService } from './skill-my-suffix.service';

@Component({
  templateUrl: './skill-my-suffix-delete-dialog.component.html'
})
export class SkillMySuffixDeleteDialogComponent {
  skill?: ISkillMySuffix;

  constructor(protected skillService: SkillMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.skillService.delete(id).subscribe(() => {
      this.eventManager.broadcast('skillListModification');
      this.activeModal.close();
    });
  }
}
