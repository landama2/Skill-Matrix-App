import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';

@Component({
  selector: 'jhi-cc-user-my-suffix-detail',
  templateUrl: './cc-user-my-suffix-detail.component.html'
})
export class CCUserMySuffixDetailComponent implements OnInit {
  cCUser: ICCUserMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cCUser }) => (this.cCUser = cCUser));
  }

  previousState(): void {
    window.history.back();
  }
}
