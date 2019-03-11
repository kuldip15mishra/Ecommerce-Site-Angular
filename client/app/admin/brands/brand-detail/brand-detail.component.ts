import { brand } from './../brand.fields';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../../shared/services/crud.service';

@Component({
  selector: 'brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit {
  brand: any;
  fields: any;
  title: string;
  busy: Subscription;
  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router, private snack: MatSnackBar) { }

  ngOnInit() {
    this.brand = this.route.snapshot.data['brand'];
    let id = this.route.snapshot.params['id'];
    this.title = (id === 'add' || id === 'new') ? "Add New Brand." : "Edit Brand - " + id;
    this.fields = brand.fields;
  }
  save(data) {
    if (!data) { return; }
    delete data['_id'];
    let id = this.route.snapshot.params['id'];
    if (id === 'add' || id === 'new') {
      this.busy = this.crud.post('brands', data).subscribe(data => this.router.navigateByUrl("/admin/brands"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    } else {
      this.busy = this.crud.patch('brands', id, data).subscribe(data => this.router.navigateByUrl("/admin/brands"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    }
  }
}