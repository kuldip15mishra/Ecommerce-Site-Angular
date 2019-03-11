import { ModalService } from './../../modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'salientink-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {
  reviews: Array<any>;
  busy: Subscription;
  constructor(private crud: CrudService, private snack: MatSnackBar, private modal: ModalService) {

  }

  ngOnInit() {
    this.getReviews();
  }
  getReviews() {
    this.busy = this.crud.get('reviews/my', null, true).subscribe(data => this.success(data), err => this.err(err));
  }
  delete(id) {
    this.modal.confirm('Delete?', 'Are you sure to delete').subscribe(res => {
      if (res) {
        this.crud.delete('reviews', id).subscribe(data => { this.getReviews() }, err => { this.err(err) });
      }
    })
  }
  success(data) {
    this.reviews = data;
  }
  err(err) {
    this.snack.open(err, 'OK', { duration: 2000 });
  }
}
