import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverUrl_auth, serverUrl_credit } from 'app/models/global.constants';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class HateSpeechService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ) { }

  predictheatspeech(tx: string): Observable<string> {
    let  parametros = new HttpParams();
    /*parametros = parametros.append('mode','cors')*/
    parametros = parametros.append("text", tx )

    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      }),
      params:parametros
    };
    //rev. que esta por esquemas
    return this.http.post<any>(`${serverUrl_credit}hate_speech/`,{"text":tx},headers);
  }
}
