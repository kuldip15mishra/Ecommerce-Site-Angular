import { Component } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SingleFileUploadModal } from '../../shared/media/modal-single';
import { Settings } from '../../settings';
import { CrudService } from '../../shared/services/crud.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../shared/services/auth.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'account-user',
  templateUrl: './privatestore.component.html',
  styleUrls: ['./privatestore.component.css']
})
export class PrivateStoreComponent {
  loading: boolean = false;
  submitted: boolean = false;
  errors: any;
  message: string;
  user: any;
  
  constructor(private auth: AuthService,private crud:CrudService, private snack: MatSnackBar, private router: Router) {
    
  }

  ngOnInit() {this.getCurrentuserId() }
  getCurrentuserId(){
    const token = localStorage.getItem('id_token') || Cookie.get('token'); //Cookies set through auth strategy
          if (token && token !== 'null') {
              this.user = this.auth.decodeUserFromToken(token);
          }
             
  }

  getCurrentLoggedInRole(){
    return this.user && this.user.role ? this.user.role : '';
  }

  getRoleForUser(){
    if(this.getCurrentLoggedInRole() ==='privatevendor'){
      return 'vendorprivateuser';
    }else{
      return 'user';
    }
  }
  cp(form: any) {
    this.loading = true;
    this.submitted = true;
    var Formatteddata={
        name:form.userName,
        email:form.userEmail,
        password:form.userPassword,
        role : this.getRoleForUser(),
        parentID :this.user._id
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
    this.snack.open('User Created successful.', 'OK', { duration: 2000 });
  }
}
