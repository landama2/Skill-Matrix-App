import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICCUserMySuffix, CCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';
import { CCUserMySuffixService } from './cc-user-my-suffix.service';
import { IUserRoleMySuffix } from 'app/shared/model/user-role-my-suffix.model';
import { UserRoleMySuffixService } from 'app/entities/user-role-my-suffix/user-role-my-suffix.service';
import { ISkillMySuffix } from 'app/shared/model/skill-my-suffix.model';
import { SkillMySuffixService } from 'app/entities/skill-my-suffix/skill-my-suffix.service';

type SelectableEntity = IUserRoleMySuffix | ISkillMySuffix;

@Component({
  selector: 'jhi-cc-user-my-suffix-update',
  templateUrl: './cc-user-my-suffix-update.component.html'
})
export class CCUserMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  userroles: IUserRoleMySuffix[] = [];
  skills: ISkillMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    fullName: [],
    createdAt: [],
    userRoleId: [],
    skillId: []
  });

  constructor(
    protected cCUserService: CCUserMySuffixService,
    protected userRoleService: UserRoleMySuffixService,
    protected skillService: SkillMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cCUser }) => {
      if (!cCUser.id) {
        const today = moment().startOf('day');
        cCUser.createdAt = today;
      }

      this.updateForm(cCUser);

      this.userRoleService.query().subscribe((res: HttpResponse<IUserRoleMySuffix[]>) => (this.userroles = res.body || []));

      this.skillService.query().subscribe((res: HttpResponse<ISkillMySuffix[]>) => (this.skills = res.body || []));
    });
  }

  updateForm(cCUser: ICCUserMySuffix): void {
    this.editForm.patchValue({
      id: cCUser.id,
      fullName: cCUser.fullName,
      createdAt: cCUser.createdAt ? cCUser.createdAt.format(DATE_TIME_FORMAT) : null,
      userRoleId: cCUser.userRoleId,
      skillId: cCUser.skillId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cCUser = this.createFromForm();
    if (cCUser.id !== undefined) {
      this.subscribeToSaveResponse(this.cCUserService.update(cCUser));
    } else {
      this.subscribeToSaveResponse(this.cCUserService.create(cCUser));
    }
  }

  private createFromForm(): ICCUserMySuffix {
    return {
      ...new CCUserMySuffix(),
      id: this.editForm.get(['id'])!.value,
      fullName: this.editForm.get(['fullName'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      userRoleId: this.editForm.get(['userRoleId'])!.value,
      skillId: this.editForm.get(['skillId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICCUserMySuffix>>): void {
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
