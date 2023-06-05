import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/login',         title: 'Login',             icon:'nc-circle-10', class: '' },
    { path: '/register',      title: 'Register',          icon:'nc-badge', class: '' },
    { path: '/recaudo_vehiculos',   title: 'Recaudo',        icon:'nc-tile-56', class: '' },
    { path: '/conteto_vehiculos',       title: 'Conteo',    icon:'nc-spaceship',  class: '' }//active-pro
];

export const ROUTES_PRIVATE: RouteInfo[] = [
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/register',      title: 'Register',          icon:'nc-badge', class: '' },
    { path: '/recaudo_vehiculos',   title: 'Recaudo',        icon:'nc-tile-56', class: '' },
    { path: '/conteto_vehiculos',       title: 'Conteo',    icon:'nc-spaceship',  class: '' }//active-pro
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public username: string = "";    public creditU: any = 0;
    public id: string = "";
    public first_name: string = "";
    public last_name: string = "";
    public email: string = "";
    public cellphone: string = "";
    public born_date: string = "";
    public authenticator: any;
    
    constructor(
        private router: Router,
        private cookieService: CookieService
    ) { }

    ngOnInit() {
        this.username = sessionStorage.getItem('username');
        this.creditU = sessionStorage.getItem('credits');
        this.id = sessionStorage.getItem('id');
        this.first_name = sessionStorage.getItem('first_name');
        this.last_name = sessionStorage.getItem('last_name');
        this.email = sessionStorage.getItem('email');
        this.cellphone = sessionStorage.getItem('cellphone');
        this.born_date = sessionStorage.getItem('born_date');
        this.authenticator = sessionStorage.getItem('authenticator');
        this.menuItems = ROUTES_PRIVATE.filter(menuItem => menuItem);
        /*if(this.username !== null && this.authenticator == "true" ){
            this.menuItems = ROUTES_PRIVATE.filter(menuItem => menuItem);
        } else if(this.username !== null && this.authenticator == "false" ){
            this.menuItems = ROUTES_AUTHEC.filter(menuItem => menuItem);
        } else {
            this.menuItems = ROUTES.filter(menuItem => menuItem);
        }*/
    }

    
  logout () {
    console.log("Cierra sesion")
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
    location.reload();
  }
}
