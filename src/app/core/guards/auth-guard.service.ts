import { Injectable } from '@angular/core';
import { SCartService } from '../../core/services/s-cart.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public user: any;

  constructor(
    private cartservice: SCartService,
    private router: Router

  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      localStorage.getItem("user_detail")
    ) {
      return of(true);
    } else {
      this.router.navigateByUrl("/login");
      return of(false);
    }
  }
}
