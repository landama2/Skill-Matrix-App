import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { SkillLevelMySuffixComponent } from './skill-level-my-suffix.component';
import { SkillLevelMySuffixDetailComponent } from './skill-level-my-suffix-detail.component';
import { SkillLevelMySuffixUpdateComponent } from './skill-level-my-suffix-update.component';
import { SkillLevelMySuffixDeleteDialogComponent } from './skill-level-my-suffix-delete-dialog.component';
import { skillLevelRoute } from './skill-level-my-suffix.route';

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild(skillLevelRoute)],
  declarations: [
    SkillLevelMySuffixComponent,
    SkillLevelMySuffixDetailComponent,
    SkillLevelMySuffixUpdateComponent,
    SkillLevelMySuffixDeleteDialogComponent
  ],
  entryComponents: [SkillLevelMySuffixDeleteDialogComponent]
})
export class BlogSkillLevelMySuffixModule {}
