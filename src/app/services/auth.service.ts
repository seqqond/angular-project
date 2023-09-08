import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode'
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri = 'http://localhost:4000/api'
  currentUser: null | User
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
  register(user: User): Observable<any> {
    return this.http.post(`${this.uri}/register`, user).pipe(
      tap((response) => this.setToken(response)),
      catchError(this.handleError)
    )
  }
  login(user: User): Observable<any> {
    return this.http.post(`${this.uri}/login`, user).pipe(
      tap((response) => this.setToken(response)),
      catchError(this.handleError)
    )
  }



  setUser(user: User){
    this.currentUser = user
  }
  getUser(){
    return this.currentUser
  }



  getLoggedInUser(): string | null{
    const token = localStorage.getItem('token')
    if (!token) {
      return null;
    }
    const decodedToken: any = decode(token);
    return decodedToken.email || null
  }
  setToken(response: any) {
    const expiresDate = new Date(new Date().getTime() + 3600 * 1000)
    localStorage.setItem('token', response.token)
    localStorage.setItem('token-exp', expiresDate.toString())
    const decodedToken: any = decode(response.token)
    const user: User = {email: decodedToken.email, password: decodedToken.password}
    this.setUser(user)
  }

  clearToken() {
    localStorage.clear()
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
  
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
  
    return throwError(() => new Error(errorMessage));
  }
  


  get token() {
    const expStr = localStorage.getItem('token-exp')
    if (expStr) {
      const date = new Date(expStr)
      if (date < new Date()) {
        this.logout()
        return null
      }
    }
    return localStorage.getItem('token')
  }
  isAuthenticated(): boolean {
    return Boolean(this.token)
  }


  logout() {
    this.clearToken();
    this.router.navigate(['login'])
  }
}
function decode(token: string): any {
  try {
    return jwt_decode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

