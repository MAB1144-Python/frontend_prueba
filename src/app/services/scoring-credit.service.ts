import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverUrl_credit } from 'app/models/global.constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ScoringCreditService {

  constructor(
    private cookieService: CookieService,
    private http:HttpClient
    ) { }

  predict_file_scoring(file: any): Observable<string> {

    var formData: any = new FormData();
    formData.append('file', file);

    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      })
    };
    var formData: any = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${serverUrl_credit}scoring_crediticio/`,
    formData,
    headers);
  }
}
