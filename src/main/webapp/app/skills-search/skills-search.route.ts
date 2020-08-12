import { ActivatedRouteSnapshot, Resolve, Route, Router, Routes } from '@angular/router';

import { SkillsComponent } from './skills.component';
import { Injectable } from '@angular/core';
// import {ISkillMySuffix, SkillMySuffix} from "app/shared/model/skill-my-suffix.model";
// import {SkillMySuffixService} from "app/entities/skill-my-suffix/skill-my-suffix.service";
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { SkillsService } from 'app/skills/skills.service';
// import {SkillMySuffixDetailComponent} from "app/entities/skill-my-suffix/skill-my-suffix-detail.component";
// import {SkillMySuffixUpdateComponent} from "app/entities/skill-my-suffix/skill-my-suffix-update.component";
// import {SkillMySuffixResolve} from "app/entities/skill-my-suffix/skill-my-suffix.route";
import { ISkill, Skill } from 'app/skills/skills.model';

@Injectable({ providedIn: 'root' })
export class SkillsResolve implements Resolve<ISkill> {
  constructor(private service: SkillsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISkill> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((skill: HttpResponse<Skill>) => {
          if (skill.body) {
            return of(skill.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Skill());
  }
}
export const SKILLS_ROUTE: Route =
  // [
  {
    path: '',
    component: SkillsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    canActivate: [UserRouteAccessService],
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'skills.title'
    }
  };
// ,
// {
//   path: ':id/view',
//   component: SkillMySuffixDetailComponent,
//   resolve: {
//     skill: SkillMySuffixResolve
//   },
//   data: {
//     authorities: [Authority.USER],
//     pageTitle: 'blogApp.skill.home.title'
//   },
//   canActivate: [UserRouteAccessService]
// },
// {
//   path: 'new',
//   component: SkillMySuffixUpdateComponent,
//   resolve: {
//     skill: SkillMySuffixResolve
//   },
//   data: {
//     authorities: [Authority.USER],
//     pageTitle: 'blogApp.skill.home.title'
//   },
//   canActivate: [UserRouteAccessService]
// },
// {
//   path: ':id/edit',
//   component: SkillMySuffixUpdateComponent,
//   resolve: {
//     skill: SkillMySuffixResolve
//   },
//   data: {
//     authorities: [Authority.USER],
//     pageTitle: 'blogApp.skill.home.title'
//   },
//   canActivate: [UserRouteAccessService]
// }
// ]
