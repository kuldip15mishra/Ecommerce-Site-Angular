import { review } from './../review.fields';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from './../../../shared/services/crud.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'salientink-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
  review: any;
  fields: any;
  title: string;
  busy: Subscription;
  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router, private snack: MatSnackBar) { }

  ngOnInit() {
    this.review = this.route.snapshot.data['review'];
    let id = this.route.snapshot.params['id'];
    this.title = (id === 'add' || id === 'new') ? "Add New Review" : "Edit Review - " + id;
    this.fields = review.fields;
  }
  save(data) {
    if (!data) { return; }
    delete data['_id'];
    let id = this.route.snapshot.params['id'];
    if (id === 'add' || id === 'new') {
      this.busy = this.crud.post('reviews', data).subscribe(data => this.router.navigateByUrl("/admin/reviews"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    } else {
      this.busy = this.crud.patch('reviews', id, data).subscribe(data => this.router.navigateByUrl("/admin/reviews"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    }
  }
}