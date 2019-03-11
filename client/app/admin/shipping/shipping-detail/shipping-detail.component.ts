import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../../shared/services/crud.service';
import { fields } from './../shipping.fields';

@Component({
  selector: 'salientink-shipping-detail',
  templateUrl: './shipping-detail.component.html',
  styleUrls: ['./shipping-detail.component.css']
})
export class ShippingDetailComponent implements OnInit {
  shipping: any;
  fields: any;
  title: string;
  busy: Subscription;
  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router, private snack: MatSnackBar) { }

  ngOnInit() {
    this.shipping = this.route.snapshot.data['shipping'];
    let id = this.route.snapshot.params['id'];
    this.title = (id === 'add' || id === 'new') ? "Add New shipping" : "Edit shipping - " + id;
    this.fields = fields.shipping;
  }
  save(data) {
    if (!data) { return; }
    delete data['_id'];
    let id = this.route.snapshot.params['id'];
    if (id === 'add' || id === 'new') {
      this.busy = this.crud.post('shippings', data).subscribe(data => this.router.navigateByUrl("/admin/shippings"), err => this.snack.open(err, 'OK'));
    } else {
      this.busy = this.crud.patch('shippings', id, data).subscribe(data => this.router.navigateByUrl("/admin/shippings"), err => this.snack.open(err, 'OK'));
    }
  }
}