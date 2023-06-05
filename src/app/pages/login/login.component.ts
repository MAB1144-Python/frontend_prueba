import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CookieService } from 'ngx-cookie-service';
import { User_authenticated,user_data } from 'app/models/User';
import Swal from 'sweetalert2';
import { LoginServiService } from 'app/services/login-servi.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public res_data: any = '';
  public token = '';
  public username = '';
  public password = '';
  public message = '';
  public globalUser!: user_data;
  public tok_us!: User_authenticated;

  Swal = require('sweetalert2')

  captcha!: string;

  modalerror!: string;
  spinner!: string;
  spinner2!: string;
  datos!: any;

  constructor(
    private router: Router,
    private LoginService: LoginServiService,
    private cookieService: CookieService
    ) {

    this.captcha = ''
    this.modalerror = '' }

  ngOnInit(): void {

  }


resolved(captchaResponse: string) {
      this.captcha = captchaResponse;
  }

badlogin(loginerror: string) {
  this.modalerror = loginerror;
  console.log('Login Incorrecto');
}

loadSpinner(spinner: string, spinner2: string) {
  this.spinner = spinner;
  this.spinner2 = spinner2;
}

public loginn() {
  this.loadSpinner(this.username,this.password);
  this.LoginService.login_ser(this.username, this.password).subscribe(
    data => {
      this.message = '';
      this.res_data = JSON.parse(JSON.stringify(data));
      console.log("+++++++++++",this.res_data)
      sessionStorage.setItem("username", this.username);
      sessionStorage.setItem("token", data.access_token);
      this.token = data.access_token;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1500
      })

      //ACA ESTÁ EL COOKIE DEL GUARD
      this.cookieService.set('access_token', data.access_token, 0.09, '/');
      this.cookieService.set('refresh_token', data.refresh_token, 0.09, '/');
      setTimeout(() => {window.location.reload();},1000);
      this.router.navigateByUrl('/user')
    },
    (error) => {
      console.error(error);
      this.message = JSON.stringify(error);
      this.badlogin(error);
      sessionStorage.clear();

      //Deploy modal error
      Swal.fire({
        icon: 'error',
        title: 'Usuario o contraseña incorrectos...',
      })

    }
  );

}

}
