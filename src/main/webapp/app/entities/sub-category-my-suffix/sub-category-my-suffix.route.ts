import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISubCategoryMySuffix, SubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';
import { SubCategoryMySuffixService } from './sub-category-my-suffix.service';
import { SubCategoryMySuffixComponent } from './sub-category-my-suffix.component';
import { SubCategoryMySuffixDetailComponent } from './sub-category-my-suffix-detail.component';
import { SubCategoryMySuffixUpdateComponent } from './sub-category-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class SubCategoryMySuffixResolve implements Resolve<ISubCategoryMySuffix> {
  constructor(private service: SubCategoryMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubCategoryMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((subCategory: HttpResponse<SubCategoryMySuffix>) => {
          if (subCategory.body) {
            return of(subCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SubCategoryMySuffix());
  }
}

export const subCategoryRoute: Routes = [
  {
    path: '',
    component: SubCategoryMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.subCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SubCategoryMySuffixDetailComponent,
    resolve: {
      subCategory: SubCategoryMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.subCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SubCategoryMySuffixUpdateComponent,
    resolve: {
      subCategory: SubCategoryMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.subCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SubCategoryMySuffixUpdateComponent,
    resolve: {
      subCategory: SubCategoryMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.subCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
