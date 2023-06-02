import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverUrl_credit } from 'app/models/global.constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SentimentAService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ) { }

  predictsentiment_a(tx: string, md:string): Observable<string> {
    let  parametros = new HttpParams();
    /*parametros = parametros.append('mode','cors')*/
    parametros = parametros.append("text", tx )
    parametros = parametros.append("model_id", md )
    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      }),
      params:parametros
    };
  console.log("linea 30..........");
  console.log(tx)
  console.log(md)
    return this.http.post<string>(`${serverUrl_credit}sentiment_analysis/`,{"text": tx, "model_id": md },headers);
  }
}

