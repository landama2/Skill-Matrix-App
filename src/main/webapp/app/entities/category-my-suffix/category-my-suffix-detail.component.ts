import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoryMySuffix } from 'app/shared/model/category-my-suffix.model';

@Component({
  selector: 'jhi-category-my-suffix-detail',
  templateUrl: './category-my-suffix-detail.component.html'
})
export class CategoryMySuffixDetailComponent implements OnInit {
  category: ICategoryMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ category }) => (this.category = category));
  }

  previousState(): void {
    window.history.back();
  }
}
