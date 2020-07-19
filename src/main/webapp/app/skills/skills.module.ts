import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { SKILLS_ROUTE } from './skills.route';
import { SkillsComponent } from './skills.component';

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild([SKILLS_ROUTE])],
  declarations: [SkillsComponent]
})
export class BlogSkillsModule {}
