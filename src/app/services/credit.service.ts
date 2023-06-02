import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpResponse, HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { serverUrl_user, serverUrl_credit } from 'app/models/global.constants';
import { BehaviorSubject, Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  current_credit(username: string): Observable<any> {
    let  parametros = new HttpParams();
    /*parametros = parametros.append('mode','cors')*/
    parametros = parametros.append("username", username )
    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      }),
      params:parametros
    };
    return this.http.post<any>(`${serverUrl_credit}get_current_credits_user`,
    {"username": username },headers);
  }

  charge_credit(username: string, credits: any): Observable<any> {
    let  parametros = new HttpParams();
    /*parametros = parametros.append('mode','cors')*/
    parametros = parametros.append("username", username )
    parametros = parametros.append("credits", credits )
    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      }),
      params:parametros
    };
    return this.http.post<any>(`${serverUrl_credit}charge_credits_to_user`,
    {"username": username,"credits": credits },headers);
  }
}
