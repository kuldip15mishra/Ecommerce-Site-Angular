import { CrudService } from './../../shared/services/crud.service';
import { AuthService } from './../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'salientink-password-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  submitted: boolean;
  loading: boolean;
  form: FormGroup;
  errors: any = {};
  errMessage: any;
  EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  constructor(private fb: FormBuilder, private crud: CrudService, private auth: AuthService, private router: Router, private route: ActivatedRoute, private snack: MatSnackBar) { }

  ngOnInit() {
    let email = this.route.queryParams['value'].email;
    this.form = this.fb.group({
      email: [email, [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]],
    });
  }

  forgot(form: any) {
    this.submitted = true;
    this.loading = true;
    this.crud.post('users/forgot', form, false).subscribe(data => {
      this.snack.open(data.message, 'OK', { duration: 2000 });
      this.errMessage = data;
      this.loading = false;
    }, err => {
      this.snack.open(err, 'OK', { duration: 2000 });
      this.errMessage = '';
      this.loading = false;
    })
  }
}
