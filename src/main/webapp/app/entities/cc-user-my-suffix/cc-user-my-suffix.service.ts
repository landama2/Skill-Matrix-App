import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';

type EntityResponseType = HttpResponse<ICCUserMySuffix>;
type EntityArrayResponseType = HttpResponse<ICCUserMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CCUserMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/cc-users';

  constructor(protected http: HttpClient) {}

  create(cCUser: ICCUserMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cCUser);
    return this.http
      .post<ICCUserMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cCUser: ICCUserMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cCUser);
    return this.http
      .put<ICCUserMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICCUserMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICCUserMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cCUser: ICCUserMySuffix): ICCUserMySuffix {
    const copy: ICCUserMySuffix = Object.assign({}, cCUser, {
      createdAt: cCUser.createdAt && cCUser.createdAt.isValid() ? cCUser.createdAt.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cCUser: ICCUserMySuffix) => {
        cCUser.createdAt = cCUser.createdAt ? moment(cCUser.createdAt) : undefined;
      });
    }
    return res;
  }
}
