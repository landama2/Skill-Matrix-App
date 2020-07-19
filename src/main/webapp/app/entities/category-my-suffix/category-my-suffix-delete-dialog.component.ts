import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoryMySuffix } from 'app/shared/model/category-my-suffix.model';
import { CategoryMySuffixService } from './category-my-suffix.service';

@Component({
  templateUrl: './category-my-suffix-delete-dialog.component.html'
})
export class CategoryMySuffixDeleteDialogComponent {
  category?: ICategoryMySuffix;

  constructor(
    protected categoryService: CategoryMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.categoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('categoryListModification');
      this.activeModal.close();
    });
  }
}
