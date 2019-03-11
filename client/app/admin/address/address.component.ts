import { ModalService } from './../../modal/modal.service';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SingleFileUploadModal } from './../../shared/media/modal-single';
import { Settings } from './../../settings';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'salientink-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addresses: Array<any>;
  fields: Array<any>;
  loading: boolean;
  address: any;
  myForm: FormGroup;
  showAddressForm: boolean;
  newAddressForm: boolean;
  busy: Subscription;
  private viewContainerRef: ViewContainerRef
  constructor(private crud: CrudService, private snack: MatSnackBar, private _fb: FormBuilder, private modal: ModalService) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      address: this._fb.group({})
    });
    this.getMyAddress();
    this.fields = [
      { field: 'name' },
      { field: 'address' },
      { field: 'city' },
      { field: 'zip', dataType: 'number' },
      { field: 'state' },
      { field: 'phone', dataType: 'number' },
    ];
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
    const control = <FormArray>this.myForm.controls['addresses'];
    if (!a) {
      const addrCtrl = this.initAddress({});
      control.push(addrCtrl);
    } else {
      a.forEach(element => {
        const addrCtrl = this.initAddress(element);
        control.push(addrCtrl);
      });
    }
  }

  getMyAddress() {
    this.close();
    this.busy = this.crud.get('addresses/my', null, true).subscribe(data => this.addresses = data, err => this.snack.open(err, 'OK', { duration: 2000 }));
  }
  close() {
    this.showAddressForm = false;
  }
  switch(a) {
    this.newAddressForm = !a.name;
    this.showAddressForm = true;
    this.address = a;
  }
  delete(item) {
    this.modal.confirm('Delete?', 'Are you sure to delete')
      .subscribe(res => {
        if (res) {
          this.crud.delete('addresses', item._id).subscribe(data => {
            this.loading = false;
            this.getMyAddress();
          }, err => {
            this.snack.open(err, 'OK', { duration: 2000 });
            this.loading = false;
          });
        }
      })
  }
  save(data) {
    // data.country = Settings.country.name
    this.loading = true;
    if (data._id) {
      this.crud.patch('addresses', data._id, data, true).subscribe(data => {
        this.loading = false;
        this.getMyAddress();
      }, err => {
        this.snack.open(err, 'OK', { duration: 2000 });
        this.loading = false;
      })
    } else {
      this.crud.post('addresses', data, true, true).subscribe(data => {
        this.loading = false;
        this.close();
        this.getMyAddress();
      }, err => {
        this.snack.open(err, 'OK', { duration: 2000 });
        this.loading = false;
      })
    }
  }
}