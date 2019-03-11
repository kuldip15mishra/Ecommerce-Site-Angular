import { Component, OnInit } from '@angular/core';
import { coupon } from './coupon.fields';
@Component({
  selector: 'salientink-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  fields: Array<any>;
  constructor() {
    this.fields = coupon.fields;
  }

  ngOnInit() {
  }

}
