import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor(
    private router: Router,
    private authService: AuthService
  ){}
  canActivate(){
    if(this.authService.isAuthenticated()) 
      return true
    this.authService.logout()
    this.router.navigate(['login'], {
      queryParams: {
        loginRequired: true
      }
    })
    return false
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
