import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { SKILLS_ROUTE } from './skills-search.route';
import { SkillsSearchComponent } from './skills-search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import {NoopAnimationsModule} from "@angular/platform-browser/animations";
// import {MatInputModule} from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from 'app/skills/material-module';

@NgModule({
  imports: [
    BlogSharedModule,
    RouterModule.forChild([SKILLS_ROUTE]),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    // MatInputModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule
    BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  declarations: [SkillsSearchComponent]
})
export class BlogSkillsSearchModule {}
