import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';
import { SubCategoryMySuffixService } from './sub-category-my-suffix.service';

@Component({
  templateUrl: './sub-category-my-suffix-delete-dialog.component.html'
})
export class SubCategoryMySuffixDeleteDialogComponent {
  subCategory?: ISubCategoryMySuffix;

  constructor(
    protected subCategoryService: SubCategoryMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('subCategoryListModification');
      this.activeModal.close();
    });
  }
}
