import { ModalService } from './../../modal/modal.service';
import { AuthService } from './../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { Settings } from './../../settings';
import { CartService } from './../../shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  newAddressForm: boolean;
  shipping: any = { best: { charge: 0 } };
  coupon: any = { amount: 0 };
  couponCode: string;
  Settings: any;
  selectedPaymentMethod: string;
  totalAmount: number = 0;
  totalAmountNoCoupon: number = 0;
  loading: boolean;
  submitted: boolean;
  id: string;
  msg: string;
  selected: number;
  addresses: Array<any>;
  address: any;
  showAddressForm: boolean;
  public checkoutForm: FormGroup;
  fields: Array<any>;
  isPrivateVendor:boolean;
  constructor(public cart: CartService, private crud: CrudService, private snack: MatSnackBar, private route: ActivatedRoute, private _fb: FormBuilder, private auth: AuthService, private modal: ModalService) { this.Settings = Settings; }
 
 
  ngOnInit() {

this.isPrivateVendor=this.isPrivateVendorUser();
    this.msg = this.route.snapshot.queryParams['msg'];
    this.id = this.route.snapshot.queryParams['id'];
    this.checkoutForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      selectedPaymentMethod: ['COD', Validators.required],
      coupon: ['A100'],
    });
    this.fields = [
      { field: 'name' },
      { field: 'address' },
      { field: 'city' },
      { field: 'zip', dataType: 'number' },
      { field: 'state' },
      { field: 'phone', dataType: 'number' },
    ];
    this.totalAmount = this.cart.getTotalPrice();
    this.getMyAddress();
    this.getBestShipper();
  }
  initAddress(a?: any) {
    return this._fb.group({
      name: [a.name],
      address: [a.address],
      city: [a.city],
      zip: [a.zip],
      state: [a.state],
      phone: [a.phone],
    });
  }

  addAddress(a?: any) {
    const control = <FormArray>this.checkoutForm.controls['addresses'];
    if (!a) {
      const addrCtrl = this.initAddress({});
      control.push(addrCtrl);
    } else {
      a.forEach((element: any) => {
        const addrCtrl = this.initAddress(element);
        control.push(addrCtrl);
      });
    }
  }
  getMyAddress() {
    this.showNewAddressForm(false);
    this.crud.get('addresses/my', null, true).subscribe(data => {
      if (data.length > 0) {
        this.addresses = data;
        this.selectAddress(data[0]);
      }
    }, err => this.snack.open(err, 'OK'));
  }
  selectAddress(a: any) {
    this.address = a;
    this.selected = a._id;
  }
  editAddress(a: any) {
    this.address = a;
    this.newAddressForm = true;
  }
  removeAddress(item: any) {
    this.modal.confirm('Delete?', 'Are you sure to delete')
      .subscribe(res => {
        if (res) {
          this.crud.delete('addresses', item._id).subscribe(data => {
            this.loading = false;
            this.getMyAddress();
          }, err => {
            this.snack.open(err, 'OK');
            this.loading = false;
          });
        }
      })
  }
  save(data: any) {
    this.loading = true;
    if (data._id) {
      this.crud.patch('addresses', data._id, data, true).subscribe(res => {
        this.loading = false;
        this.getMyAddress();
      }, err => {
        this.snack.open(err, 'OK');
        this.loading = false;
      })
    } else {
      this.crud.post('addresses', data, true, true).subscribe(data => {
        this.loading = false;
        this.getMyAddress();
      }, err => {
        this.snack.open(err, 'OK');
        this.loading = false;
      })
    }
  }
  applyCoupon(code: string) {
    this.couponCode = ''; // To prevent same code being applied twice
    this.crud.get('coupons', { where: { code: code, active: true, 'minimumCartValue': { $gte: this.totalAmountNoCoupon } } }).subscribe(data => {
      if (data.length === 0) {
        this.snack.open('Coupon is not active', 'OK', { duration: 2000 }); return;
      }
      if (data[0].amount >= this.totalAmount) {
        this.snack.open('Please add some more items before applying this coupon', 'OK', { duration: 2000 }); return;
      }
      else {
        this.coupon = data[0];
        this.couponCode = data[0].code + " (" + data[0].amount + ")";
        this.totalAmount -= parseInt(data[0].amount) || 0;
      }
    }, err => this.snack.open(err, 'OK', { duration: 2000 }));
  }
  removeCoupon() {
    this.coupon = this.couponCode = undefined;
    this.totalAmount = this.totalAmountNoCoupon;
    this.getBestShipper();
  }

  getBestShipper() {
    this.cart.getBestShipper().subscribe(data => {
      this.shipping = data[0] || {};
      this.totalAmountNoCoupon = this.totalAmount = this.cart.getTotalPrice() + this.shipping.best.charge || 0;
    }, err => {
      // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', err);
    })
  }
  checkout(order: any) {
    this.submitted = true;
    if (!order) {
      this.snack.open('Something went wrong.', 'OK', { duration: 2000 });
      return;
    }
    if (this.cart.items.length == 0) {
      this.snack.open('Your cart found empty. Please add some items', 'OK', { duration: 2000 });
      return;
    }
    if (!this.address.zip) {
      this.snack.open('You should enter an address with phone number', 'OK', { duration: 2000 });
      this.newAddressForm = true;
      return;
    }
    order.shipping = this.shipping.best.charge;
    if (!this.coupon) this.coupon = { amount: 0 }; else if (!this.coupon.amount) this.coupon = { amount: 0 };
    order.couponAmount = this.coupon.amount;
    let address: any = {};
    address.recipient_name = this.address.name;
    address.line1 = this.address.address;
    address.city = this.address.city;
    address.postal_code = this.address.zip;
    address.country_code = this.Settings.country.code;
    address.merchantID = 'SalientInk';
    order.address = address;
    this.loading = true;
    this.cart.checkout(order.selectedPaymentMethod, [], order, true);
  }

  showNewAddressForm(show: any) {
    this.newAddressForm = show;
    this.address = {};
  }
  isPrivateVendorUser(){
    if(this.auth.currentUser.role ==='vendorprivateuser'){
      return true;
    }else{
      return false;
    }
  }
}
