import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserRoleMySuffix } from 'app/shared/model/user-role-my-suffix.model';

type EntityResponseType = HttpResponse<IUserRoleMySuffix>;
type EntityArrayResponseType = HttpResponse<IUserRoleMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class UserRoleMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/user-roles';

  constructor(protected http: HttpClient) {}

  create(userRole: IUserRoleMySuffix): Observable<EntityResponseType> {
    return this.http.post<IUserRoleMySuffix>(this.resourceUrl, userRole, { observe: 'response' });
  }

  update(userRole: IUserRoleMySuffix): Observable<EntityResponseType> {
    return this.http.put<IUserRoleMySuffix>(this.resourceUrl, userRole, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserRoleMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserRoleMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
