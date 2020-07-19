import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogBlogModule)
      },
      {
        path: 'entry',
        loadChildren: () => import('./entry/entry.module').then(m => m.BlogEntryModule)
      },
      {
        path: 'tag',
        loadChildren: () => import('./tag/tag.module').then(m => m.BlogTagModule)
      },
      {
        path: 'cc-user-my-suffix',
        loadChildren: () => import('./cc-user-my-suffix/cc-user-my-suffix.module').then(m => m.BlogCCUserMySuffixModule)
      },
      {
        path: 'user-role-my-suffix',
        loadChildren: () => import('./user-role-my-suffix/user-role-my-suffix.module').then(m => m.BlogUserRoleMySuffixModule)
      },
      {
        path: 'user-skill-my-suffix',
        loadChildren: () => import('./user-skill-my-suffix/user-skill-my-suffix.module').then(m => m.BlogUserSkillMySuffixModule)
      },
      {
        path: 'skill-level-my-suffix',
        loadChildren: () => import('./skill-level-my-suffix/skill-level-my-suffix.module').then(m => m.BlogSkillLevelMySuffixModule)
      },
      {
        path: 'skill-my-suffix',
        loadChildren: () => import('./skill-my-suffix/skill-my-suffix.module').then(m => m.BlogSkillMySuffixModule)
      },
      {
        path: 'category-my-suffix',
        loadChildren: () => import('./category-my-suffix/category-my-suffix.module').then(m => m.BlogCategoryMySuffixModule)
      },
      {
        path: 'sub-category-my-suffix',
        loadChildren: () => import('./sub-category-my-suffix/sub-category-my-suffix.module').then(m => m.BlogSubCategoryMySuffixModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class BlogEntityModule {}
