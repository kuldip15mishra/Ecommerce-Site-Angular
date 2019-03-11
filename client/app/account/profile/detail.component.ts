import { MediaLibraryModal } from './../../shared/media/media-library';
import { UserService } from './../../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  profileForm: FormGroup;
  user: any = {};
  cols: any = [];
  busy: Subscription;
  loading: boolean = false;
  errMessage: string;
  submitted: boolean = false;
  EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  constructor(private snack: MatSnackBar, private _fb: FormBuilder, public auth: AuthService, private router: Router, public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.profileForm = this._fb.group({
      name: [this.auth.currentUser.name, [Validators.required]],
      avatar: [this.auth.currentUser.avatar, [Validators.required]],
    });
  }
  saveUser(data: any) {
    if (!data) { return; }
    delete data['_id'];
    this.busy = this.auth.saveProfile(data).subscribe(res => {
      this.snack.open('User Profile Modified', 'OK', { duration: 2000 });
      this.auth.updateProfile(data);
    }, error => this.snack.open(<any>error, 'OK', { duration: 2000 }));
  }
  chooseImage() {
    let dialogRef = this.dialog.open(MediaLibraryModal, {
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.profileForm.controls['avatar'].setValue(result);
      }
    });
  }
}

