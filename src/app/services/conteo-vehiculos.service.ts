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
    
  peticion(sel_estacion: string,sel_sentido: string,sel_categoria: string,fecha_hora_ini: string,fecha_hora_fin: string): Observable<string> {
    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        //'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<string>(`http://127.0.0.1:8000/datos/Conteo_Vehiculos?`+
    `sel_estacion=${sel_estacion}`+
    `&sel_sentido=${sel_sentido}`+
    `&sel_categoria=${sel_categoria}`+
    `&fecha_hora_ini=${fecha_hora_ini}`+
    `&fecha_hora_fin=${fecha_hora_fin}`,
    headers);
  }
}
