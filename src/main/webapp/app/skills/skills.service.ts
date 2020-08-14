import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISkill } from 'app/skills/skills.model';
import { IUserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

type EntityResponseType = HttpResponse<ISkill>;
type EntityResponseTypeUS = HttpResponse<IUserSkillMySuffix>;
type EntityArrayResponseType = HttpResponse<ISkill[]>;

@Injectable({ providedIn: 'root' })
export class SkillsService {
  public resourceUrl = SERVER_API_URL + 'api/skills/full';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISkill>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISkill[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  createForCurrentUser(userSkill: IUserSkillMySuffix): Observable<EntityResponseTypeUS> {
    const copy = this.convertDateFromClient(userSkill);
    return this.http
      .post<IUserSkillMySuffix>(`${this.resourceUrl}/current-user`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseTypeUS) => this.convertDateFromServer(res)));
  }

  protected convertDateFromClient(userSkill: IUserSkillMySuffix): IUserSkillMySuffix {
    const copy: IUserSkillMySuffix = Object.assign({}, userSkill, {
      changedAt: userSkill.changedAt && userSkill.changedAt.isValid() ? userSkill.changedAt.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseTypeUS): EntityResponseTypeUS {
    if (res.body) {
      res.body.changedAt = res.body.changedAt ? moment(res.body.changedAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((userSkill: IUserSkillMySuffix) => {
        userSkill.changedAt = userSkill.changedAt ? moment(userSkill.changedAt) : undefined;
      });
    }
    return res;
  }
}
