import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  // @ViewChild('btnRegister') btnRegister!: ElementRef;
  constructor(
    private authService: AuthService,
    private router: Router,
    public renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {
    this.setPageBackground()
  }
  setPageBackground() {
    this.renderer.setStyle(
      this.document.body, 'background', 'url("/assets/register.jpg") no-repeat center center fixed'
    )
    this.renderer.setStyle(this.document.body, 'background-size', 'cover')
  }

  ngOnDestroy() {
    this.renderer.removeStyle(this.document.body, 'background');
  }


  email: string = ''
  password: string = ''
  confirmPassword: string = ''
  termsAccepted: boolean = false
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required])
  }, this.passwordMatcher)
  passwordMatcher(g: AbstractControl): { [key: string]: boolean } | null {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  get emailForm() {
    return this.registerForm.controls['email']
  }
  get passwordForm() {
    return this.registerForm.controls['password']
  }
  get confirmPasswordForm() {
    return this.registerForm.controls['confirmPassword'];
  }


  register() {
    if (this.registerForm.valid) {
      const registeredUser = new Register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.confirmPassword)
      this.authService.register(registeredUser).subscribe({
        next: () => {
          this.router.navigate(['admin/posts'])
        },
        error: () => {
          alert('Such user already exists!')
          this.registerForm.reset()
          this.termsAccepted = false
        }
      })
    }
  }


}
