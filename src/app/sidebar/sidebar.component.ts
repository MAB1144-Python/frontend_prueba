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
    //{ path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    //{ path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    //{ path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    //{ path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    //{ path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    //{ path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    //{ path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    { path: '/login',         title: 'Login',             icon:'nc-circle-10', class: '' },
    { path: '/register',      title: 'Register',          icon:'nc-badge', class: '' },
    //{ path: '/menu',   title: 'Menu',        icon:'nc-tile-56', class: '' },
    //{ path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' }
];


export const ROUTES_PRIVATE: RouteInfo[] = [
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/menu',   title: 'Menu',        icon:'nc-tile-56', class: '' }
];

export const ROUTES_AUTHEC: RouteInfo[] = [
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/error-authenticator',   title: 'Autenticador',        icon:'nc-tile-56', class: '' }
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
        if(this.username !== null && this.authenticator == "true" ){
            this.menuItems = ROUTES_PRIVATE.filter(menuItem => menuItem);
        } else if(this.username !== null && this.authenticator == "false" ){
            this.menuItems = ROUTES_AUTHEC.filter(menuItem => menuItem);
        } else {
            this.menuItems = ROUTES.filter(menuItem => menuItem);
        }
    }

    
  logout () {
    console.log("Cierra sesion")
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
    location.reload();
  }
}
