import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserRoleMySuffix, UserRoleMySuffix } from 'app/shared/model/user-role-my-suffix.model';
import { UserRoleMySuffixService } from './user-role-my-suffix.service';

@Component({
  selector: 'jhi-user-role-my-suffix-update',
  templateUrl: './user-role-my-suffix-update.component.html'
})
export class UserRoleMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected userRoleService: UserRoleMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userRole }) => {
      this.updateForm(userRole);
    });
  }

  updateForm(userRole: IUserRoleMySuffix): void {
    this.editForm.patchValue({
      id: userRole.id,
      name: userRole.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userRole = this.createFromForm();
    if (userRole.id !== undefined) {
      this.subscribeToSaveResponse(this.userRoleService.update(userRole));
    } else {
      this.subscribeToSaveResponse(this.userRoleService.create(userRole));
    }
  }

  private createFromForm(): IUserRoleMySuffix {
    return {
      ...new UserRoleMySuffix(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserRoleMySuffix>>): void {
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
