import { ModalService } from './../../modal/modal.service';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wish-button',
  templateUrl: './wish-button.component.html',
  styleUrls: ['./wish-button.component.css']
})
export class WishButtonComponent implements OnInit {
  @Input() readOnly: boolean;
  @Input() product: any;
  @Input() variant: any;
  wished: boolean;
  loading: boolean = false;
  constructor(private crud: CrudService, private auth: AuthService, private snack: MatSnackBar, private modal: ModalService) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (!this.auth.loggedIn)
      return;
    this.checkWish();
  }
  checkWish() {
    this.wished = false;
    this.loading = true;
    var wishlist = this.crud.get('wishlists/product/' + this.product._id + '/' + this.variant._id, null, true).subscribe(data => {
      this.wished = data[0] ? true : false;
      this.loading = false;
    });
  }
  // On click select star
  toggleWishlist() {
    if (this.readOnly) return;
    if (!this.auth.loggedIn) {
      this.modal.login().subscribe(data => {
        if (data) { this.checkWish(); this.save(); };
      }, err => {
        this.snack.open(err, 'OK', { duration: 2000 });
      });
      return;
    } else {
      this.save();
    }
  }
  save() {
    var p = { product: this.product, variant: this.variant };
    this.loading = true;
    this.crud.post('wishlists', p).subscribe(res => {
      if (res.msg !== 'deleted') {
        this.snack.open('Added to your wishlist', 'OK', { duration: 2000 });
        this.wished = true;
      }
      else {
        this.wished = false;
      }
      this.loading = false;
    }, err => {
      this.snack.open('Please logout and login again', 'OK', { duration: 2000 });
    })
  }
}
