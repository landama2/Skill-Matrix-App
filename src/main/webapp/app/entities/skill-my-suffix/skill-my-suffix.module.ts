import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { SkillMySuffixComponent } from './skill-my-suffix.component';
import { SkillMySuffixDetailComponent } from './skill-my-suffix-detail.component';
import { SkillMySuffixUpdateComponent } from './skill-my-suffix-update.component';
import { SkillMySuffixDeleteDialogComponent } from './skill-my-suffix-delete-dialog.component';
import { skillRoute } from './skill-my-suffix.route';

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild(skillRoute)],
  declarations: [SkillMySuffixComponent, SkillMySuffixDetailComponent, SkillMySuffixUpdateComponent, SkillMySuffixDeleteDialogComponent],
  entryComponents: [SkillMySuffixDeleteDialogComponent]
})
export class BlogSkillMySuffixModule {}
