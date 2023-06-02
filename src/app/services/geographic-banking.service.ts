import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverUrl_credit } from '../models/global.constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GeographicBankingService {

  constructor(private http: HttpClient,
    private cookieService: CookieService
    ) { }

  predict_file_geographic(file: any): Observable<string> {

    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      })
    };
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${serverUrl_credit}geographic_banking/`,
    formData,
    headers);
  }
}


