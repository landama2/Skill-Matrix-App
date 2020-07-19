import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';

@Component({
  selector: 'jhi-sub-category-my-suffix-detail',
  templateUrl: './sub-category-my-suffix-detail.component.html'
})
export class SubCategoryMySuffixDetailComponent implements OnInit {
  subCategory: ISubCategoryMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subCategory }) => (this.subCategory = subCategory));
  }

  previousState(): void {
    window.history.back();
  }
}
