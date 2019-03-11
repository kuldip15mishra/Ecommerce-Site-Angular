import { FormControl } from '@angular/forms';
import { ModalService } from './../../modal/modal.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudHelper } from './../../shared/services/crud.helper';
import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import * as _ from 'lodash';
import BaseCtrl from './../../base';

@Component({
  selector: 'crud-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseCtrl implements OnInit {
  @Input() fields: Array<any>;
  @Input() no: any;
  @Input() fie: Array<any>;
  @Input() title: string;
  @Input() api: string;
  @Output() save = new EventEmitter();
  showFilter: boolean = false;
  data: any[] = [];
  url: string;
  loading: boolean;
  busy: Subscription;
  meta: any = {};
  @Input() sort: { predicate: string, reverse: boolean };
  public filterText: string;
  public filterInput = new FormControl();
  constructor(public crud: CrudService, public snack: MatSnackBar, private helper: CrudHelper, private route: Router, public modal: ModalService) {
    super();
    this.no = {};
  }

  ngOnInit() {
    this.flush();
    this.sort = { predicate: null, reverse: false };
    this.url = this.route.url;
    this.fie = this.helper.help(this.fields);
    this.getData({ sort: '-updatedAt' });
    this.filterText = "";
    let typingTimer;
    this.filterInput.valueChanges.subscribe(term => {
      clearTimeout(typingTimer);
      let vm = this;
      typingTimer = setTimeout(function () {
        vm.filterText = term;
        vm.flush();
        vm.meta.search = term;
        vm.getData({ search: term });
      }, 400);
    });
  }

  change(type) {
    this.flush();
    this.loading = true;
    this.getData({ type: type });
  }

  err(err) {
    this.snack.open(err, 'OK', { duration: 2000 });
  }
}
