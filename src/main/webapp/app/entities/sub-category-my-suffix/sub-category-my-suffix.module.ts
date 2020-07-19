import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { SubCategoryMySuffixComponent } from './sub-category-my-suffix.component';
import { SubCategoryMySuffixDetailComponent } from './sub-category-my-suffix-detail.component';
import { SubCategoryMySuffixUpdateComponent } from './sub-category-my-suffix-update.component';
import { SubCategoryMySuffixDeleteDialogComponent } from './sub-category-my-suffix-delete-dialog.component';
import { subCategoryRoute } from './sub-category-my-suffix.route';

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild(subCategoryRoute)],
  declarations: [
    SubCategoryMySuffixComponent,
    SubCategoryMySuffixDetailComponent,
    SubCategoryMySuffixUpdateComponent,
    SubCategoryMySuffixDeleteDialogComponent
  ],
  entryComponents: [SubCategoryMySuffixDeleteDialogComponent]
})
export class BlogSubCategoryMySuffixModule {}
