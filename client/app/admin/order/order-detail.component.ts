import { CrudService } from './../../shared/services/crud.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {
  item: any;
  users: any;
  cols: any;
  header: string;
  questions: any[];
  busy: Subscription;
  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router) {
    this.item = {};
  }

  ngOnInit() {
    this.item = this.route.snapshot.data['order'];
    let products = this.route.snapshot.data['products'];
    products = _.map(products, (obj: any) => {
      return { name: obj.name, val: obj._id };
    });
    let users = this.route.snapshot.data['users'];
    users = _.map(users, (obj: any) => {
      return { name: obj.name, val: obj._id };
    });
    let id = this.route.snapshot.params['id'];
    this.header = (id === 'add' || id === 'new') ? "Add New Order" : "Edit Order - " + id;
  }
  saveOrder(data) {
    if (!data) { return; }
    delete data['_id'];
    let id = this.route.snapshot.params['id'];
    if (id === 'add' || id === 'new') {
      this.busy = this.crud.post('orders/', data).subscribe(res => this.router.navigateByUrl("/admin/order"));
    } else {
      this.busy = this.crud.patch('orders/', id, data).subscribe(res => this.router.navigateByUrl("/admin/order"));
    }
  }
}