import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { serverUrl_credit } from 'app/models/global.constants';

@Injectable({
  providedIn: 'root'
})
export class ConteoVehiculosService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,) { }
    
  peticion(): Observable<string> {
    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        //'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<string>(`http://127.0.0.1:8000/datos/Conteo_Vehiculos`,headers);
  }
}
