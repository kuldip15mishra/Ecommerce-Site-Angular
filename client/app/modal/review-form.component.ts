import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from './../shared/services/crud.service';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'review-form',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.css']
})

export class ReviewFormComponent implements OnInit {

    public title: string;
    public message: string;
    myForm: FormGroup;
    user: any;
    loading: true;
    starsArray: Array<any>;
    readOnly: boolean;
    rating: any;
    // @Input() product;
    // @Output() save = new EventEmitter();
    constructor(private auth: AuthService, private crud: CrudService, private _fb: FormBuilder, public dialogRef: MatDialogRef<ReviewFormComponent>) { }
    ngOnInit() {
        this.myForm = this._fb.group({
            message: [''],
        });
        let starsArray = [];
        // Initialize to 5 stars 
        for (let index = 0; index < 5; index++) {
            let starItem = {
                index: index,
                class: 'star-off'
            };
            starsArray.push(starItem)
        }
        this.starsArray = starsArray
        // this.user = this.auth.getMe();
    }

    // On mousover
    setMouseOverRating(rating: number) {
        if (this.readOnly) {
            return;
        }
        this.validateStars(rating);
    };
    // Highlight stars
    validateStars(rating: number) {
        if (!this.starsArray || this.starsArray.length === 0) {
            return;
        }
        for (var index = 0; index < this.starsArray.length; index++) {
            var starItem = this.starsArray[index];
            if (index <= (rating - 1)) {
                starItem.class = 'star-on'
            } else {
                starItem.class = 'star-off'
            }
        }
    }

    // On click select star
    setRating(rating: number) {
        if (this.readOnly) return
        this.rating = rating;
        this.validateStars(this.rating);
        // $timeout(function () {
        // this.onRating({
        //   rating: this.rating
        // });
        // });
    }
    // hide(data) {
    //     this.dialogRef.close(data);
    // }
    // cancel() {
    //     this.dialogRef.close();
    // }
    // onSubmit(data: any) {
    //     if (!data) {
    //         this.message = 'Please rate the item from a scale of 1-5'; return;
    //     }
    //     data.pid = this.product._id;
    //     data.pname = this.product.name;
    //     data.pslug = this.product.slug;
    //     data.vendor_id = this.product.vendor_id;
    //     data.vendor_name = this.product.vendor_name;
    //     data.vendor_email = this.product.vendor_email;
    //     data.email = this.user.email;
    //     data.reviewer = this.user.name;
    //     this.crud.post('reviews', data).subscribe(data => this.hide(data), err => console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', err))
    //     this.save.emit(data);
    // }
}
