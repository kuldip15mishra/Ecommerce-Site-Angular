import { Component } from '@angular/core';
import { vendor } from './vendor.fields';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SingleFileUploadModal } from './../../shared/media/modal-single';
import { Settings } from './../../settings';
import { CrudService } from './../../shared/services/crud.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../shared/services/auth.service';
@Component({
  selector: 'account-user',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent {
  loading: boolean = false;
  submitted: boolean = false;
  errors: any;
  message: string;
  user: any;
  constructor(private auth: AuthService,private crud:CrudService, private snack: MatSnackBar, private router: Router) {
    
  }

  ngOnInit() { }

  cp(form: any) {
    this.loading = true;
    this.submitted = true;
    var Formatteddata={
      name:form.vendorName,
      email:form.vendorEmail,
      password:form.vendorPassword,
      role :'privatevendor',
    }
    if (form) {
      this.crud.post('users', Formatteddata).subscribe(data => this.success(), err => {
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
  this.snack.open('Vendor created successful.', 'OK', { duration: 2000 });
  }
}
