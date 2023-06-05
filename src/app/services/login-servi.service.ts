import { HttpResponse, HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User_authenticated, user_data } from '../models/User';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, map } from 'rxjs';

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

    login_ser(username: string, password: string): Observable<User_authenticated> {

      const headers = {
        headers: new HttpHeaders({
          'accept': 'application/json',
          //'Authorization': 'Bearer '+this.cookieService.get('access_token'),
          'Access-Control-Allow-Origin': '*'
        })
      };

      return this.http.post<User_authenticated>(`http://127.0.0.1:8000/user/login?`+
      `username=${username}`+
      `&password=${password}`,
      headers);
    }  
  
    register(username: string, first_name: string, last_name: string, email: string, cellphone: string, password: string, born_date: string): Observable<string> {

      const headers = {
        headers: new HttpHeaders({
          'accept': 'application/json',
          //'Authorization': 'Bearer '+this.cookieService.get('access_token'),
          'Access-Control-Allow-Origin': '*'
        })
      };
      
      return this.http.post<string>(`http://127.0.0.1:8000/user/Registro?`+
      `username=${username}`+
      `&first_name=${first_name}`+
      `&last_name=${last_name}`+
      `&cellphone=${cellphone}`+
      `&email=${email}`+
      `&password=${password}`+
      `&born_date=${born_date}`,
      headers);
    }
}
