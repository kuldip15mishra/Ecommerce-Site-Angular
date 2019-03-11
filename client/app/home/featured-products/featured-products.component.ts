import { Subscription } from 'rxjs';
import { CrudService } from './../../shared/services/crud.service';
import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'salientink-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {
  @Input() products: any;

  public carouselOptions: Object = {
    autoplay: false,
    loop: true,
    center: true,
    lazyLoad: true,
    margin: 30,
    autoplaySpeed: 500,
    navSpeed: 300,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      },
      1400: {
        items: 4
      },
      1800: {
        items: 5
      }
    }
  }

  constructor() { }
  ngOnInit() { }
}
