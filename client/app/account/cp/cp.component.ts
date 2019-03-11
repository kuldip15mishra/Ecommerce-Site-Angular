import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account-cp',
  templateUrl: './cp.component.html',
  styleUrls: ['./cp.component.css']
})
export class CpComponent implements OnInit {
  loading: boolean = false;
  submitted: boolean = false;
  errors: any;
  message: string;
  user: any;
  constructor(private auth: AuthService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit() { }
  cp(form: any) {
    this.loading = true;
    this.submitted = true;
    if (form) {
      this.auth.changePassword(form).subscribe(data => this.success(), err => {
        err = err.json();
        this.snack.open(err.message, 'OK', { duration: 2000 }); this.loading = false;
      });
    } else {
      this.snack.open('Blank password!', 'OK', { duration: 2000 });
      this.loading = false;
    }
  }
  success() {
    this.loading = false;
    this.router.navigateByUrl("/admin/dashboard");
    this.snack.open('Password change successful.', 'OK', { duration: 2000 });
  }
}
