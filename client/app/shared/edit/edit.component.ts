import { MatDialog } from '@angular/material';
import { CrudHelper } from './../services/crud.helper';
import { MediaLibraryModal } from './../media/media-library';
import { CrudService } from './../services/crud.service';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import * as _ from 'lodash';
const URL = '/api/media';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Input() item: any = {};
  @Input() cols: any;
  @Input() fields: any;
  @Input() api: string;
  @Output() save = new EventEmitter();
  visible: boolean;
  response: any;
  errorMessage: string;
  public editForm: FormGroup;
  loading: boolean;
  err: any;
  o: any = {};
  remainingItems: any = [];
  constructor(public dialog: MatDialog, private _fb: FormBuilder, private helper: CrudHelper) { }

  ngOnInit() {
    if (this.fields) this.cols = _.clone(this.helper.help(this.fields));
    if (this.item.constructor === Object) {
      this.cols.push({ field: '_id', dataType: 'hidden' });
    }
    this.cols.forEach((i: any) => {
      let validators = [];
      i.required ? validators.push(Validators.required) : false;
      if (!i.heading) i.heading = i.field;
      i.dataType === 'number' ? validators.push(Validators.pattern("^[-+]?[0-9]*\.?[0-9]+$")) : false;

      this.o[i.field] = [this.item[i.field], validators];
      this.editForm = this._fb.group(this.o);

      if (i.dataType === 'array')
        this.getRemainingOptions(i.field, i.options);
    });
  }
  getRemainingOptions(field: string, fromArray: any[]) {
    let assigned = this.item[field];
    let diff = _.differenceBy(fromArray, assigned, '_id');
    this.remainingItems[field] = diff;
  }
  remove(chip: string, field: any, disabled: boolean) {
    if (!disabled) {
      this.item[field] = _.pull(this.item[field], chip);
      this.remainingItems[field].push(chip);
    }
  }

  chooseImage(field: any) {
    let dialogRef = this.dialog.open(MediaLibraryModal, {
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editForm.controls[field].setValue(result);
      }
    });
  }
  onSubmit(data: any) {
    this.save.emit(data);
  }
}

