import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class ProductFeaturesComponent implements OnInit {
  @Input() features: any = [];
  @Input('group')
  public featuresForm: FormGroup;
  constructor() { }
  ngOnInit() {
  }
  err(err) {
    console.log(err);
  }
}