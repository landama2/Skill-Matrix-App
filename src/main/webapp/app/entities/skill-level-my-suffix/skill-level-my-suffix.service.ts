import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';

type EntityResponseType = HttpResponse<ISkillLevelMySuffix>;
type EntityArrayResponseType = HttpResponse<ISkillLevelMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SkillLevelMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/skill-levels';

  constructor(protected http: HttpClient) {}

  create(skillLevel: ISkillLevelMySuffix): Observable<EntityResponseType> {
    return this.http.post<ISkillLevelMySuffix>(this.resourceUrl, skillLevel, { observe: 'response' });
  }

  update(skillLevel: ISkillLevelMySuffix): Observable<EntityResponseType> {
    return this.http.put<ISkillLevelMySuffix>(this.resourceUrl, skillLevel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISkillLevelMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISkillLevelMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
