import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICategoryMySuffix, CategoryMySuffix } from 'app/shared/model/category-my-suffix.model';
import { CategoryMySuffixService } from './category-my-suffix.service';
import { CategoryMySuffixComponent } from './category-my-suffix.component';
import { CategoryMySuffixDetailComponent } from './category-my-suffix-detail.component';
import { CategoryMySuffixUpdateComponent } from './category-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class CategoryMySuffixResolve implements Resolve<ICategoryMySuffix> {
  constructor(private service: CategoryMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategoryMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((category: HttpResponse<CategoryMySuffix>) => {
          if (category.body) {
            return of(category.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CategoryMySuffix());
  }
}

export const categoryRoute: Routes = [
  {
    path: '',
    component: CategoryMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'blogApp.category.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CategoryMySuffixDetailComponent,
    resolve: {
      category: CategoryMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.category.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CategoryMySuffixUpdateComponent,
    resolve: {
      category: CategoryMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.category.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CategoryMySuffixUpdateComponent,
    resolve: {
      category: CategoryMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.category.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
