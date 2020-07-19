import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';

type EntityResponseType = HttpResponse<IUserSkillMySuffix>;
type EntityArrayResponseType = HttpResponse<IUserSkillMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class UserSkillMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/user-skills';

  constructor(protected http: HttpClient) {}

  create(userSkill: IUserSkillMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userSkill);
    return this.http
      .post<IUserSkillMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(userSkill: IUserSkillMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userSkill);
    return this.http
      .put<IUserSkillMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserSkillMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserSkillMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(userSkill: IUserSkillMySuffix): IUserSkillMySuffix {
    const copy: IUserSkillMySuffix = Object.assign({}, userSkill, {
      changedAt: userSkill.changedAt && userSkill.changedAt.isValid() ? userSkill.changedAt.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
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
