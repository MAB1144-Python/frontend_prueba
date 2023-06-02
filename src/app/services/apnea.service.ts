import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { serverUrl_credit } from 'app/models/global.constants';


@Injectable({
  providedIn: 'root'
})
export class ApneaService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ) {}

  predictapnea(tx: string, md:string): Observable<string> {
    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      })
    };
    var formData: any = new FormData();
    return this.http.post<string>(`${serverUrl_credit}apnea/`,
    {"text": tx, "model_id": md },headers);

    
  }
}

