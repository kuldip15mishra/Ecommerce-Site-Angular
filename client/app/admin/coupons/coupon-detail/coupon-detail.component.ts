import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../../shared/services/crud.service';
import { coupon } from './../coupon.fields';

@Component({
  selector: 'salientink-coupon-detail',
  templateUrl: './coupon-detail.component.html',
  styleUrls: ['./coupon-detail.component.css']
})
export class CouponDetailComponent implements OnInit {
  coupon: any;
  fields: any;
  title: string;
  busy: Subscription;
  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router, private snack: MatSnackBar) {
    this.fields = coupon.fields;
  }
  ngOnInit() {
    this.coupon = this.route.snapshot.data['coupon'];
    let id = this.route.snapshot.params['id'];
    this.title = (id === 'add' || id === 'new') ? "Add New coupon" : "Edit coupon - " + id;
  }
  save(data) {
    if (!data) { return; }
    delete data['_id'];
    let id = this.route.snapshot.params['id'];
    if (id === 'add' || id === 'new') {
      this.busy = this.crud.post('coupons', data, true, true).subscribe(data => this.router.navigateByUrl("/admin/coupons"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    } else {
      this.busy = this.crud.patch('coupons', id, data, true).subscribe(data => this.router.navigateByUrl("/admin/coupons"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    }
  }
}