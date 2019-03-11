import { CrudService } from './../../shared/services/crud.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'salientink-homepage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePageComponent implements OnInit {
  busy: Subscription;
  products: any[];

  constructor(private crud: CrudService, private el: ElementRef) { }

  ngOnInit() {
    this.busy = this.crud.get('products', { params: { limit: 20, where: { sale: true } } }).subscribe((data: any) => {
      this.products = data;
    }, error => { });
  }
}
