import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment as env, environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  search(query:string ):Observable<any>{
    const params = {
      action: 'wbsearchentities',
      format: 'json',
      search: query,
      language: 'es',
      origin: '*',
    }
    return this.http.get<any>(environment.BASE_URL,{params})
  }


  getEntity(entity:string  ){
    const params = {
      action: 'wbgetclaims',
      format: 'json',
      entity: entity,
      origin: '*',
    }
    return this.http.get<any>(environment.BASE_URL,{params})
  }
}