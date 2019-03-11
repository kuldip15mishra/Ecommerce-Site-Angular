import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { feature } from './feature.fields';

@Component({
  selector: 'salientink-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  fields: Array<any>;
  constructor() { this.fields = feature.fields; }
}
