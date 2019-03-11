import { MatSnackBar } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() filename: string = 'sportscenter';
  data1: string[] = [];

  constructor(private snack: MatSnackBar) {

  }

  ngOnInit() {

  }
  export(format: string, data) {
    this.data1 = [];
    this.data1.push(JSON.stringify(this.data));

    if (!document.getElementById('exportable')) {
      this.snack.open('Please create a div with  id="exportable" whose data is to be exported', 'OK', { duration: 2000 });
      return;
    }

    var blob;
    if (format === 'csv') {
      blob = new Blob([document.getElementById('exportable').innerHTML], { type: "application/vnd.ms-excel;charset=charset=utf-8" });
      FileSaver.saveAs(blob, this.filename + ".csv");
    }
    else if (format === 'excel') {
      blob = new Blob([document.getElementById('exportable').innerHTML], {
        type: "application/vnd.ms-excel;charset=charset=utf-8"
      });
      FileSaver.saveAs(blob, this.filename + ".xls");
    }
    else if (format === 'json') {
      blob = new Blob(this.data1, { type: "text/json;charset=utf-8" });
      FileSaver.saveAs(blob, this.filename + ".json");
    }
    else if (format === 'text') {
      blob = new Blob(this.data1, { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, this.filename + ".txt");
    }
  }
}
