import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';

@Component({
  selector: 'jhi-user-skill-my-suffix-detail',
  templateUrl: './user-skill-my-suffix-detail.component.html'
})
export class UserSkillMySuffixDetailComponent implements OnInit {
  userSkill: IUserSkillMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userSkill }) => (this.userSkill = userSkill));
  }

  previousState(): void {
    window.history.back();
  }
}
