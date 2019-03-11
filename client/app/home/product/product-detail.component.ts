import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { ModalService } from './../../modal/modal.service';
import { AuthService } from './../../shared/services/auth.service';
import { Settings } from './../../settings';
import { CrudService } from './../../shared/services/crud.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'product-detail-component',
  templateUrl: 'product-detail.component.html',
  styleUrls: ['product-detail.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  busy: Subscription;
  reviewSettings: any;
  Settings: any;
  selectedIndex: number;
  reviewCount: number;
  rating: any;
  reviews: Array<any>;
  result: any;
  message: string;
  user: any;
  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router, private auth: AuthService, private modal: ModalService, private snack: MatSnackBar, private title: Title) {
    this.product = {};
    this.Settings = Settings;
    this.reviewSettings = Settings.reviewSettings || {};
    this.selectedIndex = 0;
  }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.title.setTitle(this.product.name + ' - SalientInk');
    let id = this.route.snapshot.params['id'];
    this.getReviews();
  }

  changeIndex(i: number) {
    this.selectedIndex = i;
  }
  getReviews() {
    if (!this.product._id) return;
    this.busy = this.crud.get('reviews/product/' + this.product._id).subscribe(r => {
      this.publishRatings(r);
      this.reviews = r;
    }, err => this.snack.open(err, 'OK', { duration: 2000 }));
  }
  publishRatings(r: any) {
    var vm = this
    var reviewCount = 0
    var rating = { r5: 0, r4: 0, r3: 0, r2: 0, r1: 0, count: 0, total: 0, avg: 0 }
    r.forEach(function (i: any) {
      if (i.message) reviewCount++
      if (i.rating) rating.count++
      if (i.rating) rating.total = rating.total + i.rating
      if (i.rating == 5) rating.r5++
      if (i.rating == 4) rating.r4++
      if (i.rating == 3) rating.r3++
      if (i.rating == 2) rating.r2++
      if (i.rating == 1) rating.r1++
    }, this);
    this.reviewCount = reviewCount
    rating.avg = Math.round(rating.total / rating.count * 10) / 10
    this.rating = rating
  }
  deleteReview(review: any) {
    this.modal.confirm('Are you sure to delete your review?', 'This is unrecoverable')
      .subscribe(result => {
        if (result)
          this.crud.delete('reviews', review._id).subscribe(data => this.getReviews(), err => this.snack.open('Error while saving your review.', 'OK', { duration: 2000 }));
      })
  }
  myReview(review: any) {
    return true;
  }
  reviewForm() {
    if (!this.auth.loggedIn) {
      this.snack.open('Please login to review', 'OK', { duration: 2000 });
      this.modal.login().subscribe(data => {
        if (data) this.review();
      }, err => {
        this.snack.open(err, 'OK', { duration: 2000 });
      });
      return;
    } else {
      this.review();
    }
  }
  review() {
    this.modal.review()
      .subscribe((data: any) => {
        if (!data) {
          this.message = 'Please rate the item from a scale of 1-5'; return;
        }
        this.user = this.auth.currentUser;
        data.pid = this.product._id;
        data.pname = this.product.name;
        data.pslug = this.product.slug;
        data.vendor_id = this.product.vendor_id;
        data.vendor_name = this.product.vendor_name;
        data.vendor_email = this.product.vendor_email;
        data.email = this.user.email;
        data.reviewer = this.user.name;
        this.crud.post('reviews', data).subscribe(res => {
          this.getReviews();
          if (this.reviewSettings.moderate)
            this.snack.open('Your review is under moderation. Will be visible to public after approval.', 'OK', { duration: 2000 });
        }, err => this.snack.open(err, 'OK', { duration: 2000 }));
      });
  }
  gotoVendor(id: string) {
    // this.$state.go('vendor', { id: id }, { reload: false });
  }
}