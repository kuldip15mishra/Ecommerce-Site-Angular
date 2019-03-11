import { FormGroup, FormBuilder } from '@angular/forms';
import { Settings } from './../../settings';
import { AuthService } from './../../shared/services/auth.service';
import { ModalService } from './../../modal/modal.service';
import { CrudHelper } from './../../shared/services/crud.helper';
import { CrudService } from './../../shared/services/crud.service';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar } from '@angular/material';
// import { SearchPipe } from './../../shared/pipes/search.pipe';
import { PluralizePipe } from './../../shared/pipes/pluralize.pipe';
import { ActivatedRoute } from '@angular/router';
import { Http, URLSearchParams } from '@angular/http';
import { Component, ViewChild, OnInit, Input, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import BaseCtrl from './../../base';

@Component({
  selector: 'salientink-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrdersComponent extends BaseCtrl implements OnInit {
  pending: Array<any>;
  shipped: Array<any>;
  cancelled: Array<any>;
  delivered: Array<any>;
  orderTypes: any[];
  data: any[] = [];
  meta: any = {};
  sort: { predicate: string, reverse: boolean };
  api: string = 'orders';
  Settings: any;
  message: string;
  busy: Subscription;
  constructor(public crud: CrudService, public snack: MatSnackBar, private auth: AuthService, private _fb: FormBuilder, public modal: ModalService) { super(); }

  ngOnInit() {
    this.Settings = Settings;
    this.populateTabs();
    this.flush(); // Important
    // this.getData({ sort: '-updatedAt' });
  }
  populateTabs() {
    this.busy = this.crud.get('orders/pending', null, true).subscribe(data => { this.pending = data; }, err => { this.snack.open(err, 'OK', { duration: 2000 }) });
    this.busy = this.crud.get('orders/shipped', null, true).subscribe(data => { this.shipped = data; }, err => this.snack.open(err, 'OK', { duration: 2000 }));
    this.busy = this.crud.get('orders/cancelled', null, true).subscribe(data => { this.cancelled = data; }, err => this.snack.open(err, 'OK', { duration: 2000 }));
    this.busy = this.crud.get('orders/delivered', null, true).subscribe(data => { this.delivered = data; }, err => this.snack.open(err, 'OK', { duration: 2000 }));
  }
  changeOrderStatus(order: any) {
    this.crud.patch('orders', order._id, order).subscribe(data => { this.populateTabs(); }, err => { this.snack.open(err, 'OK', { duration: 2000 }) });
  }
  changePaymentStatus(order: any) {
    this.crud.patch('orders', order._id, order).subscribe(data => { this.populateTabs(); }, err => { this.snack.open(err, 'OK', { duration: 2000 }) });
  }

  cancelOrder(order: any) {
    if (!this.auth.loggedIn) {
      this.modal.login().subscribe();
      return;
    }

    this.modal.cancelOrder()
      .subscribe((data: any) => {
        if (!data) {
          this.message = 'Please tell us why you want to cancel the order'; return;
        }
        order.status = 'Cancellation Requested'
        order.comment = data.comment;
        this.crud.patch('orders', order._id, order).subscribe(data => {
          this.snack.open('Order Cancellation Request Successful', 'OK', { duration: 2000 });
        });
      });
  }
}
