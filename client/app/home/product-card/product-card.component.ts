import { Settings } from './../../settings';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  Settings: any;
  i: any;
  highlightedDiv: number;
  
  @Input() product: any;
  @Input() parentCategoryID:any;
  constructor() {
    this.Settings = Settings;
  }

  ngOnInit() {
    this.i = this.product.variants[0];
    
  }
  changeVariant(i: any) {
    this.i = i;
  }
}
