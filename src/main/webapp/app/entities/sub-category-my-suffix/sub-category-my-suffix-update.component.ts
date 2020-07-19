import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISubCategoryMySuffix, SubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';
import { SubCategoryMySuffixService } from './sub-category-my-suffix.service';
import { ICategoryMySuffix } from 'app/shared/model/category-my-suffix.model';
import { CategoryMySuffixService } from 'app/entities/category-my-suffix/category-my-suffix.service';

@Component({
  selector: 'jhi-sub-category-my-suffix-update',
  templateUrl: './sub-category-my-suffix-update.component.html'
})
export class SubCategoryMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  categories: ICategoryMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    categoryId: []
  });

  constructor(
    protected subCategoryService: SubCategoryMySuffixService,
    protected categoryService: CategoryMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subCategory }) => {
      this.updateForm(subCategory);

      this.categoryService.query().subscribe((res: HttpResponse<ICategoryMySuffix[]>) => (this.categories = res.body || []));
    });
  }

  updateForm(subCategory: ISubCategoryMySuffix): void {
    this.editForm.patchValue({
      id: subCategory.id,
      name: subCategory.name,
      categoryId: subCategory.categoryId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subCategory = this.createFromForm();
    if (subCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.subCategoryService.update(subCategory));
    } else {
      this.subscribeToSaveResponse(this.subCategoryService.create(subCategory));
    }
  }

  private createFromForm(): ISubCategoryMySuffix {
    return {
      ...new SubCategoryMySuffix(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      categoryId: this.editForm.get(['categoryId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubCategoryMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICategoryMySuffix): any {
    return item.id;
  }
}
