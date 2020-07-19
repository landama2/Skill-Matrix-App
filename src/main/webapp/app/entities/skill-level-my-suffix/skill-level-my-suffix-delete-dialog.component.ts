import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';
import { SkillLevelMySuffixService } from './skill-level-my-suffix.service';

@Component({
  templateUrl: './skill-level-my-suffix-delete-dialog.component.html'
})
export class SkillLevelMySuffixDeleteDialogComponent {
  skillLevel?: ISkillLevelMySuffix;

  constructor(
    protected skillLevelService: SkillLevelMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.skillLevelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('skillLevelListModification');
      this.activeModal.close();
    });
  }
}
