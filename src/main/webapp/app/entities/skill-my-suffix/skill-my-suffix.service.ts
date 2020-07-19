import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISkillMySuffix } from 'app/shared/model/skill-my-suffix.model';

type EntityResponseType = HttpResponse<ISkillMySuffix>;
type EntityArrayResponseType = HttpResponse<ISkillMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SkillMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/skills';

  constructor(protected http: HttpClient) {}

  create(skill: ISkillMySuffix): Observable<EntityResponseType> {
    return this.http.post<ISkillMySuffix>(this.resourceUrl, skill, { observe: 'response' });
  }

  update(skill: ISkillMySuffix): Observable<EntityResponseType> {
    return this.http.put<ISkillMySuffix>(this.resourceUrl, skill, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISkillMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISkillMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
