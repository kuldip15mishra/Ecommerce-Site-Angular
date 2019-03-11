import { ModalService } from './../../modal/modal.service';
import { CrudService } from './../../shared/services/crud.service';
import { AuthService } from './../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'salientink-password-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ResetPasswordComponent implements OnInit {
  submitted: boolean;
  loading: boolean;
  form: FormGroup;
  errors: any = {};
  errMessage: any;
  EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  constructor(private fb: FormBuilder, private crud: CrudService, private route: ActivatedRoute, private snack: MatSnackBar, private modal: ModalService) { }

  ngOnInit() {
    let email = this.route.queryParams['value'].email;
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      passwordcf: ['', [Validators.required]],
    });
  }

  reset(form: any) {
    this.submitted = true;
    this.loading = true;
    this.crud.post('users/reset/' + this.route.params['value'].id, form, false)
      .subscribe((data: any) => {
        this.snack.open(data.message, 'OK', { duration: 2000 });
        // this.router.navigateByUrl('/account/login');
        this.modal.login().subscribe();
        this.loading = false;
      }, (err: any) => {
        this.snack.open('Password reset email is invalid or has expired.', 'OK', { duration: 2000 });
        this.loading = false;
      });
  }
}
