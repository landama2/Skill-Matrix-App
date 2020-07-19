import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISkillMySuffix, SkillMySuffix } from 'app/shared/model/skill-my-suffix.model';
import { SkillMySuffixService } from './skill-my-suffix.service';
import { SkillMySuffixComponent } from './skill-my-suffix.component';
import { SkillMySuffixDetailComponent } from './skill-my-suffix-detail.component';
import { SkillMySuffixUpdateComponent } from './skill-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class SkillMySuffixResolve implements Resolve<ISkillMySuffix> {
  constructor(private service: SkillMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISkillMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((skill: HttpResponse<SkillMySuffix>) => {
          if (skill.body) {
            return of(skill.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SkillMySuffix());
  }
}

export const skillRoute: Routes = [
  {
    path: '',
    component: SkillMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'blogApp.skill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SkillMySuffixDetailComponent,
    resolve: {
      skill: SkillMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.skill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SkillMySuffixUpdateComponent,
    resolve: {
      skill: SkillMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.skill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SkillMySuffixUpdateComponent,
    resolve: {
      skill: SkillMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.skill.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
