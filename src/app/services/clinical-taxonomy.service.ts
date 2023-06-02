import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverUrl_credit } from 'app/models/global.constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ClinicalTaxonomyService {

  constructor(private http: HttpClient,
    private cookieService: CookieService
    ) { }

  predict_file_clinical(file: any): Observable<any> {

    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      })
    };
    var formData: any = new FormData();
    formData.append('pdf_file', file);
    return this.http.post<string>(`${serverUrl_credit}clinical_taxonomy/`,
    formData,
    headers);
  }
}

