import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';

@Component({
  selector: 'jhi-skill-level-my-suffix-detail',
  templateUrl: './skill-level-my-suffix-detail.component.html'
})
export class SkillLevelMySuffixDetailComponent implements OnInit {
  skillLevel: ISkillLevelMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ skillLevel }) => (this.skillLevel = skillLevel));
  }

  previousState(): void {
    window.history.back();
  }
}
