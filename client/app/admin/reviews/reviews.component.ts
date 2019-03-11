import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { review } from './review.fields';
import { Subscription } from 'rxjs';

@Component({
  selector: 'salientink-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Array<any>;
  fields: Array<any>;
  no: any;
  busy: Subscription;
  constructor(private crud: CrudService, private snack: MatSnackBar) {
    this.fields = review.fields;
    this.no = { add: true };
  }

  ngOnInit() {
    this.busy = this.crud.get('reviews', null, true).subscribe(this.success, this.err);
  }
  success(data) {
    this.reviews = data;
  }
  err(err) {
    this.snack.open(err, 'OK', { duration: 2000 });
  }
}
