import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../../shared/services/crud.service';
import { feature } from './../feature.fields';

@Component({
  selector: 'salientink-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.css']
})
export class FeatureDetailComponent implements OnInit {
  feature: any;
  fields: any;
  title: string;
  busy: Subscription;
  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router, private snack: MatSnackBar) { }

  ngOnInit() {
    this.feature = this.route.snapshot.data['feature'];
    let id = this.route.snapshot.params['id'];
    this.title = (id === 'add' || id === 'new') ? "Add New feature" : "Edit feature - " + id;
    this.fields = feature.fields;
  }
  save(data) {
    if (!data) { return; }
    delete data['_id'];
    let id = this.route.snapshot.params['id'];
    if (id === 'add' || id === 'new') {
      this.busy = this.crud.post('features', data).subscribe(data => this.router.navigateByUrl("/admin/features"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    } else {
      this.busy = this.crud.patch('features', id, data).subscribe(data => this.router.navigateByUrl("/admin/features"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    }
  }
}