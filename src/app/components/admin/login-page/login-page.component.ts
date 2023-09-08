import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnDestroy {
constructor(
  private authService: AuthService,
  private router: Router,
  private renderer: Renderer2,
  @Inject(DOCUMENT) private document: Document){
    this.setPagebackGround()
  }
  email: string = ''
  password: string = ''
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
  })
  setPagebackGround(){
    this.renderer.setStyle(
      this.document.body,
      'background',
      'url("/assets/background-color.jpg") no-repeat center center fixed'
    )
    this.renderer.setStyle(this.document.body, 'background-size', 'cover');
  }
  ngOnDestroy(){
    this.renderer.removeStyle(this.document.body, 'background');
  }
  login(){
    if (this.loginForm.valid) {
      const user = new User(this.loginForm.value.email, this.loginForm.value.password)
      this.authService.login(user).subscribe({
        next: (response) => {
          this.router.navigate(['admin/posts'])
          localStorage.setItem('authToken', response.token)
          this.authService.setUser(response.user)
        },
        error: (error) => {
          console.error(error)
          alert('The login/password is wrong');
          this.loginForm.reset()
        }
      })
    } else {
      console.log("Form is not valid", this.loginForm);
    }
  }
  get emailForm(){
    return this.loginForm.controls['email']
  }
}
