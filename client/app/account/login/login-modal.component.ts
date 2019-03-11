import { MatSnackBar, MatDialogRef } from '@angular/material';
import { UserService } from './../../shared/services/user.service';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { Response } from '@angular/http';
import { AuthService } from './../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../shared/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account-login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginModalComponent implements OnInit {
  submitted: boolean;
  loading: boolean = false;
  errMessage: any;
  signupErrMessage: any;
  user: any;
  errors: any;
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  constructor(private userService: UserService, private auth: AuthService, private router: Router, private route: ActivatedRoute, private snack: MatSnackBar, private _fb: FormBuilder, public dialogRef: MatDialogRef<LoginModalComponent>) {
    this.errors = {};
  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: ['admin@sportscenter.com', [Validators.required, Validators.email]],
      password: ['qwerty', [Validators.required]],
    });
    this.signupForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }
  gotoForgotPassword(url: string) {
    this.router.navigateByUrl('/account/forgot-password?email=' + url);
  }
 
  login(form: any) {
    this.submitted = true;
    this.loading = true;
    this.user = {};
    this.auth.login(form)
      .subscribe((result: any) => {
        if (result === true) {
          this.loading = false;
          this.dialogRef.close(true);
         
        } else {
          this.errMessage = 'Username or password is incorrect';
          this.loading = false;
        }
      },
      err => this.error(err, 'login'));
  }

  signup(form: any) {
    this.submitted = true;
    this.loading = true;
    this.userService.register(form)
      .subscribe((result: Response) => {
        this.loading = false;
        this.signupForm = this._fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
          name: ['', [Validators.required]],
        });
        this.snack.open('User registration successful', 'OK', { duration: 2000 });
      },
      err => this.error(err, 'signup'));
  }

  error(err: any, from: string) {
    this.loading = false;
    if (err.status === 504) {
      this.snack.open(err.statusText, 'OK', { duration: 2000 });
      return;
    }
    err = err.json();
    if (!err.message) {
      this.errMessage = err;
      return;
    }
    let msg = err.message;
    if (err.email) msg = err.email.message;
    if (msg === 'Unexpected token E in JSON at position 0') msg = 'Could not communicate to api server';
    (from === 'login') ? this.errMessage = msg : this.signupErrMessage = msg;
    this.snack.open(msg, 'OK', { duration: 2000 });
  }
}
