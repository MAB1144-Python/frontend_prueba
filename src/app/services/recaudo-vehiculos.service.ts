import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RecaudoVehiculosService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,) { }
    
  peticion(sel_estacion: string,sel_sentido: string,sel_categoria: string,fecha_hora_ini: string,fecha_hora_fin: string): Observable<string> {
    let  parametros = new HttpParams();
    /*parametros = parametros.append('mode','cors')*/
    parametros = parametros.append('sel_estacion',"abc")

    const headers = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        //'Authorization': 'Bearer '+this.cookieService.get('access_token'),
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<string>(`http://127.0.0.1:8000/datos/Recaudo_Vehiculos?`+
    `sel_estacion=${sel_estacion}`+
    `&sel_sentido=${sel_sentido}`+
    `&sel_categoria=${sel_categoria}`+
    `&fecha_hora_ini=${fecha_hora_ini}`+
    `&fecha_hora_fin=${fecha_hora_fin}`,
    headers);
  }
}
