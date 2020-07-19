import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';
import { SubCategoryMySuffixService } from './sub-category-my-suffix.service';
import { SubCategoryMySuffixDeleteDialogComponent } from './sub-category-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-sub-category-my-suffix',
  templateUrl: './sub-category-my-suffix.component.html'
})
export class SubCategoryMySuffixComponent implements OnInit, OnDestroy {
  subCategories?: ISubCategoryMySuffix[];
  eventSubscriber?: Subscription;

  constructor(
    protected subCategoryService: SubCategoryMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.subCategoryService.query().subscribe((res: HttpResponse<ISubCategoryMySuffix[]>) => (this.subCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSubCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubCategoryMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('subCategoryListModification', () => this.loadAll());
  }

  delete(subCategory: ISubCategoryMySuffix): void {
    const modalRef = this.modalService.open(SubCategoryMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subCategory = subCategory;
  }
}
