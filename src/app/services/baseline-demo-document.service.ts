import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { serverUrl_models,serverUrl_credit } from 'app/models/global.constants';

@Injectable({
  providedIn: 'root'
})
export class BaselineDemoDocumentService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    ) { }

  baseline_demo_document(tx: string): Observable<string> {
    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      })
    };
    var formData: any = new FormData();
    console.log(this.cookieService.get('access_token'))
    return this.http.post<string>(`${serverUrl_credit}bases/`,
    {"text": tx},headers);
  }
}
