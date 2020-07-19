import { Route } from '@angular/router';

import { SkillsComponent } from './skills.component';

export const SKILLS_ROUTE: Route = {
  path: '',
  component: SkillsComponent,
  data: {
    authorities: [],
    pageTitle: 'skills.title'
  }
};
