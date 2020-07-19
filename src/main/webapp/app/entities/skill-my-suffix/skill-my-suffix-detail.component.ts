import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISkillMySuffix } from 'app/shared/model/skill-my-suffix.model';

@Component({
  selector: 'jhi-skill-my-suffix-detail',
  templateUrl: './skill-my-suffix-detail.component.html'
})
export class SkillMySuffixDetailComponent implements OnInit {
  skill: ISkillMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ skill }) => (this.skill = skill));
  }

  previousState(): void {
    window.history.back();
  }
}
