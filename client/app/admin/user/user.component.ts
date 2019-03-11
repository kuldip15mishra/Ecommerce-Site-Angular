import { Component } from '@angular/core';
import { user } from './user.fields';

@Component({
  selector: 'account-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  fields: Array<any>;
  no: any;
  constructor() {
    this.fields = user.fields;
    this.no = { add: true, export: true, delete: true, clone: true };
  }
}
