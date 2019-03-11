import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from './../shared/services/crud.service';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'cancel-order',
    templateUrl: './cancel-order.component.html',
    styleUrls: ['./cancel-order.component.css']
})

export class CancelOrderComponent implements OnInit {
    public title: string;
    public message: string;
    myForm: FormGroup;
    user: any;
    loading: true;
    starsArray: Array<any>;
    readOnly: boolean;
    rating: any;
    constructor(private auth: AuthService, private crud: CrudService, private _fb: FormBuilder, public dialogRef: MatDialogRef<CancelOrderComponent>) { }
    ngOnInit() {
        this.myForm = this._fb.group({
            comment: [''],
        });
    }
}
