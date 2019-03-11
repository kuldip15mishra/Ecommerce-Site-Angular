import { ModalService } from './../../modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { wishlist } from './wishlist.fields';
import { Settings } from './../../settings';
import { Subscription } from 'rxjs';

@Component({
  selector: 'salientink-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlists: Array<any>;
  wishlist: any;
  Settings: any;
  busy: Subscription;
  constructor(private crud: CrudService, private snack: MatSnackBar, private modal: ModalService) {
    this.fields = wishlist.fields;
  }
  fields: Array<any>;
  ngOnInit() {
    this.Settings = Settings;
    this.get();
  }
  get() {
    this.busy = this.crud.get('wishlists/my', null, true).subscribe(data => this.wishlists = data, err => this.snack.open(err, 'OK', { duration: 2000 }));
  }
  delete(id: string) {
    this.modal.confirm("Are you sure?", "").subscribe(data => {
      if (data)
        this.crud.delete('wishlists', id, true).subscribe(data => this.get(), err => this.snack.open(err, 'OK', { duration: 2000 }));
    });
  }
}
