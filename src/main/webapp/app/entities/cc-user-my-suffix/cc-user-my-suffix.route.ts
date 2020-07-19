import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICCUserMySuffix, CCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';
import { CCUserMySuffixService } from './cc-user-my-suffix.service';
import { CCUserMySuffixComponent } from './cc-user-my-suffix.component';
import { CCUserMySuffixDetailComponent } from './cc-user-my-suffix-detail.component';
import { CCUserMySuffixUpdateComponent } from './cc-user-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class CCUserMySuffixResolve implements Resolve<ICCUserMySuffix> {
  constructor(private service: CCUserMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICCUserMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cCUser: HttpResponse<CCUserMySuffix>) => {
          if (cCUser.body) {
            return of(cCUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CCUserMySuffix());
  }
}

export const cCUserRoute: Routes = [
  {
    path: '',
    component: CCUserMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'blogApp.cCUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CCUserMySuffixDetailComponent,
    resolve: {
      cCUser: CCUserMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.cCUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CCUserMySuffixUpdateComponent,
    resolve: {
      cCUser: CCUserMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.cCUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CCUserMySuffixUpdateComponent,
    resolve: {
      cCUser: CCUserMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.cCUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
