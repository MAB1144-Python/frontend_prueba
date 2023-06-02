import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverUrl_credit } from 'app/models/global.constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ReidentificacionVehiculosService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    ) { }

  predictreidentificacion(file_array: any): Observable<string> {
    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      })
    };

    var formData: any = new FormData();
    var file_name = ['file_plate1','file_plate2','file_shape1','file_shape2']
    for(let i=0; i < 4; i++){
      formData.append(file_name[i], file_array[i]);
    }
    console.log(this.cookieService.get('access_token'))
    return this.http.post<string>(`${serverUrl_credit}reidentificacion_vehiculos/`, formData,headers);
    //{"Coincidence": "Negative", "Probability": "0.9999174"}
}
}
