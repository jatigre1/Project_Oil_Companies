import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, oil_companies } from 'src/app/models';
import {environment as env, environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor (private http: HttpClient){}

  getCompanyList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<oil_companies>>{
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params = new HttpParams().set('ordering',ordering).set('search',search);
    }

    return this.http.get<APIResponse<oil_companies>>(`${env.BASE_URL}/oil_companies`,{
      params: params,
    });
  }

}
