import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'address',
    templateUrl: 'address.component.html',
})
export class AddressComponent implements OnInit {
    @Input('group')
    public adressForm: FormGroup;
    constructor() {

    }
    ngOnInit() {
    }
}