import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { UserSkillMySuffixComponent } from './user-skill-my-suffix.component';
import { UserSkillMySuffixDetailComponent } from './user-skill-my-suffix-detail.component';
import { UserSkillMySuffixUpdateComponent } from './user-skill-my-suffix-update.component';
import { UserSkillMySuffixDeleteDialogComponent } from './user-skill-my-suffix-delete-dialog.component';
import { userSkillRoute } from './user-skill-my-suffix.route';

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild(userSkillRoute)],
  declarations: [
    UserSkillMySuffixComponent,
    UserSkillMySuffixDetailComponent,
    UserSkillMySuffixUpdateComponent,
    UserSkillMySuffixDeleteDialogComponent
  ],
  entryComponents: [UserSkillMySuffixDeleteDialogComponent]
})
export class BlogUserSkillMySuffixModule {}
