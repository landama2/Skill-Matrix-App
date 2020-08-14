import { ActivatedRouteSnapshot, Resolve, Route, Router, Routes } from '@angular/router';

import { SkillsSearchComponent } from './skills-search.component';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { SkillsService } from 'app/skills/skills.service';
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
export const SKILLS_ROUTE: Route = {
  path: '',
  component: SkillsSearchComponent,
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
