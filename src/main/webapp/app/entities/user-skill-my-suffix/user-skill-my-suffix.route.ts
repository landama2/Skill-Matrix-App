import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserSkillMySuffix, UserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';
import { UserSkillMySuffixService } from './user-skill-my-suffix.service';
import { UserSkillMySuffixComponent } from './user-skill-my-suffix.component';
import { UserSkillMySuffixDetailComponent } from './user-skill-my-suffix-detail.component';
import { UserSkillMySuffixUpdateComponent } from './user-skill-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class UserSkillMySuffixResolve implements Resolve<IUserSkillMySuffix> {
  constructor(private service: UserSkillMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserSkillMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userSkill: HttpResponse<UserSkillMySuffix>) => {
          if (userSkill.body) {
            return of(userSkill.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserSkillMySuffix());
  }
}

export const userSkillRoute: Routes = [
  {
    path: '',
    component: UserSkillMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.userSkill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserSkillMySuffixDetailComponent,
    resolve: {
      userSkill: UserSkillMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.userSkill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserSkillMySuffixUpdateComponent,
    resolve: {
      userSkill: UserSkillMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.userSkill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserSkillMySuffixUpdateComponent,
    resolve: {
      userSkill: UserSkillMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.userSkill.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
