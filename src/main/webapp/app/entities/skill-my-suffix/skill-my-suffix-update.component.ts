import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISkillMySuffix, SkillMySuffix } from 'app/shared/model/skill-my-suffix.model';
import { SkillMySuffixService } from './skill-my-suffix.service';
import { ICategoryMySuffix } from 'app/shared/model/category-my-suffix.model';
import { CategoryMySuffixService } from 'app/entities/category-my-suffix/category-my-suffix.service';
import { ISubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';
import { SubCategoryMySuffixService } from 'app/entities/sub-category-my-suffix/sub-category-my-suffix.service';

type SelectableEntity = ICategoryMySuffix | ISubCategoryMySuffix;

@Component({
  selector: 'jhi-skill-my-suffix-update',
  templateUrl: './skill-my-suffix-update.component.html'
})
export class SkillMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  categories: ICategoryMySuffix[] = [];
  subcategories: ISubCategoryMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    categoryId: [],
    subCategoryId: []
  });

  constructor(
    protected skillService: SkillMySuffixService,
    protected categoryService: CategoryMySuffixService,
    protected subCategoryService: SubCategoryMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ skill }) => {
      this.updateForm(skill);

      this.categoryService.query().subscribe((res: HttpResponse<ICategoryMySuffix[]>) => (this.categories = res.body || []));

      this.subCategoryService.query().subscribe((res: HttpResponse<ISubCategoryMySuffix[]>) => (this.subcategories = res.body || []));
    });
  }

  updateForm(skill: ISkillMySuffix): void {
    this.editForm.patchValue({
      id: skill.id,
      name: skill.name,
      categoryId: skill.categoryId,
      subCategoryId: skill.subCategoryId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const skill = this.createFromForm();
    if (skill.id !== undefined) {
      this.subscribeToSaveResponse(this.skillService.update(skill));
    } else {
      this.subscribeToSaveResponse(this.skillService.create(skill));
    }
  }

  private createFromForm(): ISkillMySuffix {
    return {
      ...new SkillMySuffix(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      categoryId: this.editForm.get(['categoryId'])!.value,
      subCategoryId: this.editForm.get(['subCategoryId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISkillMySuffix>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
