import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { CCUserMySuffixComponent } from './cc-user-my-suffix.component';
import { CCUserMySuffixDetailComponent } from './cc-user-my-suffix-detail.component';
import { CCUserMySuffixUpdateComponent } from './cc-user-my-suffix-update.component';
import { CCUserMySuffixDeleteDialogComponent } from './cc-user-my-suffix-delete-dialog.component';
import { cCUserRoute } from './cc-user-my-suffix.route';

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild(cCUserRoute)],
  declarations: [
    CCUserMySuffixComponent,
    CCUserMySuffixDetailComponent,
    CCUserMySuffixUpdateComponent,
    CCUserMySuffixDeleteDialogComponent
  ],
  entryComponents: [CCUserMySuffixDeleteDialogComponent]
})
export class BlogCCUserMySuffixModule {}
