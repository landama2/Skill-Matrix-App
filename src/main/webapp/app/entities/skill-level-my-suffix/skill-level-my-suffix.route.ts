import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISkillLevelMySuffix, SkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';
import { SkillLevelMySuffixService } from './skill-level-my-suffix.service';
import { SkillLevelMySuffixComponent } from './skill-level-my-suffix.component';
import { SkillLevelMySuffixDetailComponent } from './skill-level-my-suffix-detail.component';
import { SkillLevelMySuffixUpdateComponent } from './skill-level-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class SkillLevelMySuffixResolve implements Resolve<ISkillLevelMySuffix> {
  constructor(private service: SkillLevelMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISkillLevelMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((skillLevel: HttpResponse<SkillLevelMySuffix>) => {
          if (skillLevel.body) {
            return of(skillLevel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SkillLevelMySuffix());
  }
}

export const skillLevelRoute: Routes = [
  {
    path: '',
    component: SkillLevelMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.skillLevel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SkillLevelMySuffixDetailComponent,
    resolve: {
      skillLevel: SkillLevelMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.skillLevel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SkillLevelMySuffixUpdateComponent,
    resolve: {
      skillLevel: SkillLevelMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.skillLevel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SkillLevelMySuffixUpdateComponent,
    resolve: {
      skillLevel: SkillLevelMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.skillLevel.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
