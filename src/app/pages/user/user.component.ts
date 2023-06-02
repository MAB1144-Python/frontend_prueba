import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    public creditU: any = 0;
    public id: string = "";
    public first_name: string = "";
    public last_name: string = "";
    public email: string = "";
    public username: string = "";
    public cellphone: string = "";
    public born_date: string = "";
    public authenticator: string = "";

    ngOnInit(){
        this.creditU = sessionStorage.getItem('credits');
        this.id = sessionStorage.getItem('id');
        this.first_name = sessionStorage.getItem('first_name');
        this.last_name = sessionStorage.getItem('last_name');
        this.email = sessionStorage.getItem('email');
        this.username = sessionStorage.getItem('username');
        this.cellphone = sessionStorage.getItem('cellphone');
        this.born_date = sessionStorage.getItem('born_date');
        this.authenticator = sessionStorage.getItem('authenticator')
        console.log(this.creditU)
        if(this.authenticator == "false"){
            Swal.fire({
                icon: 'warning',
                title: 'Aun no te has autenticado, debes realizarlo para poder usar los servicios',
                showConfirmButton: false,
                timer: 5000
              })
        }else if(this.creditU <= 50 && this.creditU != null){
            Swal.fire({
                icon: 'warning',
                title: 'Tus creditos se estan agotando, entre a tu pasarela de pagos y adquiere más',
                showConfirmButton: false,
                timer: 5000
              })
        }
    }
    
}
