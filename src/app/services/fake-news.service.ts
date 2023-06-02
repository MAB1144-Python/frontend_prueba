import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverUrl_credit } from 'app/models/global.constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FakeNewsService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ) { }

  predictfake_news(tx: string, model:string): Observable<string> {
    let  parametros = new HttpParams();
    /*parametros = parametros.append('mode','cors')*/
    parametros = parametros.append('text',tx)
    parametros = parametros.append('model_id',"NB_cp")

    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      }),
      params:parametros
    };
    console.log(this.cookieService.get('access_token'))

    //return this.http.post<string>(`${serverUrl_user}fakenews/`,
    return this.http.post<string>(`${serverUrl_credit}fakenews/`,
    {'text':tx,'model_id':"NB_cp"},
    headers);
  }
}
