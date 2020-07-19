import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISkillLevelMySuffix, SkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';
import { SkillLevelMySuffixService } from './skill-level-my-suffix.service';

@Component({
  selector: 'jhi-skill-level-my-suffix-update',
  templateUrl: './skill-level-my-suffix-update.component.html'
})
export class SkillLevelMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected skillLevelService: SkillLevelMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ skillLevel }) => {
      this.updateForm(skillLevel);
    });
  }

  updateForm(skillLevel: ISkillLevelMySuffix): void {
    this.editForm.patchValue({
      id: skillLevel.id,
      name: skillLevel.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const skillLevel = this.createFromForm();
    if (skillLevel.id !== undefined) {
      this.subscribeToSaveResponse(this.skillLevelService.update(skillLevel));
    } else {
      this.subscribeToSaveResponse(this.skillLevelService.create(skillLevel));
    }
  }

  private createFromForm(): ISkillLevelMySuffix {
    return {
      ...new SkillLevelMySuffix(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISkillLevelMySuffix>>): void {
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
}
