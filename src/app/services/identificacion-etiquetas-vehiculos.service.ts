import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverUrl_credit } from 'app/models/global.constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class IdentificacionEtiquetasVehiculosService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    ) { }

  postImage(file: any): Observable<string> {

    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*',
      })
    }
    var formData: any = new FormData();
    formData.append('img_file', file);
    return this.http.post<string>(`${serverUrl_credit}identificacion_etiquetas_vehiculos/`, formData,headers);
  }

}
