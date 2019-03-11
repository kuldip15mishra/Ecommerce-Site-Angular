import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})
export class ListImageComponent implements OnInit {
  colors: string[] = [
    '#f9a43e',
    '#59a2be',
    '#67bf74',
    '#f58559',
    '#e4c62e',
    '#f16364',
    '#2093cd',
    '#ad62a7'
  ];
  bgColor: string;
  @Input() string: string;
  firstLetter: string = '';
  numberOfColors: number;
  constructor() {
    this.numberOfColors = this.colors.length;
  }

  ngOnInit() {
    if (this.string) {
      let firstLetter = this.firstLetter = _.capitalize(this.string.toString().charAt(0));
      this.bgColor = this.getColor(firstLetter);
    }
  }

  hashCode(str: any) {
    let hash = 0,
      length = str.length,
      i, chr;

    if (length === 0) {
      return hash;
    }

    for (i = 0; i < length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return hash;
  }

  getColor(string: string) {
    var color = Math.abs(this.hashCode(string.charAt(0))) % this.numberOfColors;
    return this.colors[color];
  }
}
