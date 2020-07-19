import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserRoleMySuffix, UserRoleMySuffix } from 'app/shared/model/user-role-my-suffix.model';
import { UserRoleMySuffixService } from './user-role-my-suffix.service';
import { UserRoleMySuffixComponent } from './user-role-my-suffix.component';
import { UserRoleMySuffixDetailComponent } from './user-role-my-suffix-detail.component';
import { UserRoleMySuffixUpdateComponent } from './user-role-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class UserRoleMySuffixResolve implements Resolve<IUserRoleMySuffix> {
  constructor(private service: UserRoleMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserRoleMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userRole: HttpResponse<UserRoleMySuffix>) => {
          if (userRole.body) {
            return of(userRole.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserRoleMySuffix());
  }
}

export const userRoleRoute: Routes = [
  {
    path: '',
    component: UserRoleMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.userRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserRoleMySuffixDetailComponent,
    resolve: {
      userRole: UserRoleMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.userRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserRoleMySuffixUpdateComponent,
    resolve: {
      userRole: UserRoleMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.userRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserRoleMySuffixUpdateComponent,
    resolve: {
      userRole: UserRoleMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.userRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
