import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class Guardian1Guard implements CanActivate {

  constructor(private cookieService: CookieService,
    private router: Router) {

 }

 redirect (flag: boolean): any{
  if (!flag){
    this.router.navigate(['/error']);
  }
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookieService.check('access_token');
    this.redirect(cookie);
    return true;
  }
  
}
