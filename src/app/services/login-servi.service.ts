import { HttpResponse, HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User_authenticated, user_data } from '../models/User';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { serverUrl_auth, serverUrl_credit } from 'app/models/global.constants';

@Injectable({
  providedIn: 'root'
})
export class LoginServiService {
  datos!: any;
  private userSubject: BehaviorSubject<User_authenticated | null>;
  public user: Observable<User_authenticated | null>;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { 
    this.userSubject = new BehaviorSubject<User_authenticated | null>(null);
    this.user = this.userSubject.asObservable(); }
    private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })}

    login_ser2(username: string, password: string): Observable<User_authenticated> {
      const formHeaders = new HttpHeaders();
      formHeaders.append('accept', 'application/json');
      formHeaders.append('Access-Control-Allow-Origin', '*');
      formHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  
      var formData: any = new FormData();
      formData.append("username", username);
      formData.append("password", password);
  
      const formParams = new HttpParams()
        .set('username', username)
        .set('password', password);
  
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      this.startRefreshTokenTimer();
      console.log("llama servicio")
      return this.http.post<User_authenticated>(`${serverUrl_auth}login`, formParams);
    }
    login_ser(username: string, password: string): Observable<User_authenticated> {
      const formHeaders = new HttpHeaders();
      formHeaders.append('accept', 'application/json');
      formHeaders.append('Access-Control-Allow-Origin', '*');
      formHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  
      const formParams = new HttpParams()
        .set('username', username)
        .set('password', password)
        .set('accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Content-Type', 'application/x-www-form-urlencoded');
  

      console.log("llama servicio")
      return this.http.post<User_authenticated>(`${serverUrl_auth}login`, formParams);
    }  

    
    login_ser3(username: string, password: string): Observable<User_authenticated> {
      const formHeaders = new HttpHeaders();
      formHeaders.append('accept', 'application/json');
      formHeaders.append('Access-Control-Allow-Origin', '*');
      formHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  
      var formData: any = new FormData();
      formData.append("username", username);
      formData.append("password", password);
  
      let  parametros = new HttpParams();
      /*parametros = parametros.append('mode','cors')*/
      parametros = parametros.append("username", username)
      parametros = parametros.append("password", password)
  
      const headers = {
        headers: new HttpHeaders({
          'accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }),
        params:parametros
      };
      return this.http.post<User_authenticated>(`${serverUrl_auth}login/`, headers);
    }
  
  
    register(username: string, nombre: string, apellido: string, correo: string, celular: string, password: string, born_date: string): Observable<string> {
      const usuario = new user_data("","","","","","","","",0,"");
      usuario.id =  "0";
      usuario.username = username;
      usuario.first_name = nombre;
      usuario.last_name = apellido;
      usuario.cellphone = celular;
      usuario.email = correo;
      usuario.password = password;
      usuario.born_date = born_date;
      usuario.credits = 100;
  
  
      const body = JSON.stringify(usuario);
  
      return this.http.post<string>(`${serverUrl_credit}create`, body, this.options);
  
    }
  
    get_user_by_token(user_authenticated: string): Observable<user_data> {
  
      const body = JSON.stringify("");
      const headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user_authenticated}`
        })
      }
      return this.http.post<user_data>(`${serverUrl_auth}get-user-data`, body, headers);
    }
  
    refreshToken() {
      const headers = {
        headers: new HttpHeaders({
          'accept': 'application/json',
          'Authorization': 'Bearer '+this.cookieService.get('access_token'),
          'Access-Control-Allow-Origin': '*',
         })
      };
      return this.http.post<any>(`${serverUrl_auth}refresh`,this.cookieService.get('refresh_token'),headers)
          .pipe(map((user) => {
              this.userSubject.next(user);
              this.cookieService.set('access_token', user.access_token, 0.09, '/');
              this.cookieService.set('refresh_token', user.refresh_token, 0.09, '/');
              this.startRefreshTokenTimer();
              catchError((error: HttpErrorResponse) => {
  
              let errorMessage: any;
  
              if (error.error instanceof ErrorEvent) {
  
                // client-side error
  
                errorMessage = error.error.message;
  
              } else {
  
                // server-side error
  
                errorMessage = error.status + error.message;
                window.alert(errorMessage);
              }
              return user;
  
  
          });
    }))
    }
  
  private refreshTokenTimeout?: NodeJS.Timeout;
  
  private startRefreshTokenTimer() {
  
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), 400000);
  }
  
  private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
  }
}
