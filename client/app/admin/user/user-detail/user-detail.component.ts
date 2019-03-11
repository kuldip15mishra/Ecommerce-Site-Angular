import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from './../../../shared/services/crud.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { user } from './../user.fields';

@Component({
  selector: 'salientink-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any;
  fields: any;
  title: string;
  busy: Subscription;
  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router, private snack: MatSnackBar) { }
  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    let id = this.route.snapshot.params['id'];
    this.title = (id === 'add' || id === 'new') ? "Add New user" : "Edit user - " + id;
    this.fields = user.fields;
  }
  save(data) {
    if (!data) { return; }
    delete data['_id'];
    let id = this.route.snapshot.params['id'];
    if (id === 'add' || id === 'new') {
      this.busy = this.crud.post('users', data).subscribe(data => this.router.navigateByUrl("/admin/users"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    } else {
      this.busy = this.crud.patch('users', id, data).subscribe(data => this.router.navigateByUrl("/admin/users"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    }
  }
}
