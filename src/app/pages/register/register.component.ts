import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiService } from 'app/services/login-servi.service';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public company = "";
  public username = "";
  public email = "";
  public first_name = "";
  public last_name = "";
  public born_date : any;
  public password = "";
  public password1 = "";
  public password2 = "";
  public message= '';
  public cellphone = '';
  color_background = "#FF0000";

  
  captcha!:string;
  registerOK!: string;

  constructor(
    private router:Router,
    private LoginService: LoginServiService,
    private renderer:Renderer2,
    @Inject(DOCUMENT) document: Document
    ) {
    this.captcha=''
    this.registerOK=''
   }


  ngOnInit(): void {    Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Recuerda para registrarte debes llenar toda la información',
    showConfirmButton: false,
    timer: 4000
  })
  }
  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
  }

  successRegister(loginerror: string) {
    this.registerOK = loginerror;
    console.log('Cuenta creada');
  }



register(){
  let info_ok = true;
  if(this.first_name == ""){
    const inp_first_name: HTMLElement = document.getElementById("first_name");
    inp_first_name.style.backgroundColor = 'red';
    info_ok = false;
  }else{
    const inp_first_name: HTMLElement = document.getElementById("email");
    inp_first_name.style.backgroundColor = 'white'
  }
  if(this.last_name == ""){
    const inp_first_name: HTMLElement = document.getElementById("last_name");
    inp_first_name.style.backgroundColor = 'red';
    info_ok = false;
  }else{
    const inp_first_name: HTMLElement = document.getElementById("email");
    inp_first_name.style.backgroundColor = 'white';
  }
  if(this.username == ""){
    const inp_first_name: HTMLElement = document.getElementById("username");
    inp_first_name.style.backgroundColor = 'red';
    info_ok = false;
  }else{
    const inp_first_name: HTMLElement = document.getElementById("email");
    inp_first_name.style.backgroundColor = 'white';
  }
  if(this.email == ""){
    const inp_first_name: HTMLElement = document.getElementById("email");
    inp_first_name.style.backgroundColor = 'red';
    info_ok = false;
  }else{
    const inp_first_name: HTMLElement = document.getElementById("email");
    inp_first_name.style.backgroundColor = 'white';
  }
  if(this.born_date == null){
    const inp_first_name: HTMLElement = document.getElementById("born_date");
    inp_first_name.style.backgroundColor = 'red';
    info_ok = false;
  }else{
    const inp_first_name: HTMLElement = document.getElementById("email");
    inp_first_name.style.backgroundColor = 'white';
  }
  if(this.cellphone == ""){
    const inp_first_name: HTMLElement = document.getElementById("cellphone");
    inp_first_name.style.backgroundColor = 'red';
    info_ok = false;
  }else{
    const inp_first_name: HTMLElement = document.getElementById("email");
    inp_first_name.style.backgroundColor = 'white';
  }
  console.log(info_ok)
  console.log(this.password1)
  console.log(this.password2)
  if(info_ok){
    if(this.password1 == this.password2 && this.password1.length > 8 && this.password2.length > 8){
      this.password = this.password1
      this.LoginService.register(this.username, this.first_name, this.last_name ,this.email,this.cellphone,this.password,this.born_date.toString()).subscribe(
        (data) => {
          this.message = '';
          this.successRegister(data);

          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso, recuerda que debes revisar tu correo y dar click en el link de autenticación',
            showConfirmButton: false,
            timer: 3000
          })

          //Pause for reload
          setTimeout(() => {
            this.router.navigate(['/login']); //
          },
          1500);
          sessionStorage.clear();
        },
        (error) => {
          console.error(error);
          this.message = JSON.stringify(error);

          Swal.fire({
            icon: 'error',
            title: 'Algo salió mal con tu registro',
            showConfirmButton: true,
            timer: 3500
          })
        }
      );
    }else{
      this.message = 'Las contraseñas no coinciden o no tiene el mínimo de 8 caracteres';
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: this.message,
        showConfirmButton: true,
        timer: 3500
      })
    }
  }else{
    this.message = 'Algunos de los campos necesitan ser completados';
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Oops...',
      text: this.message,
      showConfirmButton: true,
      timer: 3500
    })

  }
  }

}
