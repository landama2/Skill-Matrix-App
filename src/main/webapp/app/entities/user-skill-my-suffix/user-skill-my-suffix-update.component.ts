import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IUserSkillMySuffix, UserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';
import { UserSkillMySuffixService } from './user-skill-my-suffix.service';
import { ICCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';
import { ISkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';
import { SkillLevelMySuffixService } from 'app/entities/skill-level-my-suffix/skill-level-my-suffix.service';
import { ISkillMySuffix } from 'app/shared/model/skill-my-suffix.model';
import { SkillMySuffixService } from 'app/entities/skill-my-suffix/skill-my-suffix.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = ICCUserMySuffix | ISkillLevelMySuffix;

@Component({
  selector: 'jhi-user-skill-my-suffix-update',
  templateUrl: './user-skill-my-suffix-update.component.html'
})
export class UserSkillMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  skilllevels: ISkillLevelMySuffix[] = [];
  skills: ISkillMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    changedAt: [],
    userId: [],
    skillLevelId: [],
    skillId: []
  });

  constructor(
    protected userSkillService: UserSkillMySuffixService,
    protected userService: UserService,
    protected skillLevelService: SkillLevelMySuffixService,
    protected skillsService: SkillMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userSkill }) => {
      if (!userSkill.id) {
        const today = moment().startOf('day');
        userSkill.changedAt = today;
      }

      this.updateForm(userSkill);

      this.userService.query().subscribe((res: HttpResponse<ICCUserMySuffix[]>) => (this.users = res.body || []));

      this.skillLevelService.query().subscribe((res: HttpResponse<ISkillLevelMySuffix[]>) => (this.skilllevels = res.body || []));

      this.skillsService.query().subscribe((res: HttpResponse<ISkillMySuffix[]>) => (this.skills = res.body || []));
    });
  }

  updateForm(userSkill: IUserSkillMySuffix): void {
    this.editForm.patchValue({
      id: userSkill.id,
      changedAt: userSkill.changedAt ? userSkill.changedAt.format(DATE_TIME_FORMAT) : null,
      userId: userSkill.userId,
      skillLevelId: userSkill.skillLevelId,
      skillId: userSkill.skillId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userSkill = this.createFromForm();
    if (userSkill.id !== undefined) {
      this.subscribeToSaveResponse(this.userSkillService.update(userSkill));
    } else {
      this.subscribeToSaveResponse(this.userSkillService.create(userSkill));
    }
  }

  private createFromForm(): IUserSkillMySuffix {
    return {
      ...new UserSkillMySuffix(),
      id: this.editForm.get(['id'])!.value,
      changedAt: this.editForm.get(['changedAt'])!.value ? moment(this.editForm.get(['changedAt'])!.value, DATE_TIME_FORMAT) : undefined,
      userId: this.editForm.get(['userId'])!.value,
      skillLevelId: this.editForm.get(['skillLevelId'])!.value,
      skillId: this.editForm.get(['skillId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserSkillMySuffix>>): void {
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
