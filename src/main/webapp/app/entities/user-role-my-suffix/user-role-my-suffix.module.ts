import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { UserRoleMySuffixComponent } from './user-role-my-suffix.component';
import { UserRoleMySuffixDetailComponent } from './user-role-my-suffix-detail.component';
import { UserRoleMySuffixUpdateComponent } from './user-role-my-suffix-update.component';
import { UserRoleMySuffixDeleteDialogComponent } from './user-role-my-suffix-delete-dialog.component';
import { userRoleRoute } from './user-role-my-suffix.route';

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild(userRoleRoute)],
  declarations: [
    UserRoleMySuffixComponent,
    UserRoleMySuffixDetailComponent,
    UserRoleMySuffixUpdateComponent,
    UserRoleMySuffixDeleteDialogComponent
  ],
  entryComponents: [UserRoleMySuffixDeleteDialogComponent]
})
export class BlogUserRoleMySuffixModule {}
