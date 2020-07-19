import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { CategoryMySuffixComponent } from './category-my-suffix.component';
import { CategoryMySuffixDetailComponent } from './category-my-suffix-detail.component';
import { CategoryMySuffixUpdateComponent } from './category-my-suffix-update.component';
import { CategoryMySuffixDeleteDialogComponent } from './category-my-suffix-delete-dialog.component';
import { categoryRoute } from './category-my-suffix.route';

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild(categoryRoute)],
  declarations: [
    CategoryMySuffixComponent,
    CategoryMySuffixDetailComponent,
    CategoryMySuffixUpdateComponent,
    CategoryMySuffixDeleteDialogComponent
  ],
  entryComponents: [CategoryMySuffixDeleteDialogComponent]
})
export class BlogCategoryMySuffixModule {}
