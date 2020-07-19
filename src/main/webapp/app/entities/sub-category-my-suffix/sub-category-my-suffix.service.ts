import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';

type EntityResponseType = HttpResponse<ISubCategoryMySuffix>;
type EntityArrayResponseType = HttpResponse<ISubCategoryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SubCategoryMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/sub-categories';

  constructor(protected http: HttpClient) {}

  create(subCategory: ISubCategoryMySuffix): Observable<EntityResponseType> {
    return this.http.post<ISubCategoryMySuffix>(this.resourceUrl, subCategory, { observe: 'response' });
  }

  update(subCategory: ISubCategoryMySuffix): Observable<EntityResponseType> {
    return this.http.put<ISubCategoryMySuffix>(this.resourceUrl, subCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubCategoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubCategoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
