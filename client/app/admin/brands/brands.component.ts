import { brand } from './brand.fields';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'salientink-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  fields: Array<any>;
  constructor() { this.fields = brand.fields; }
}
