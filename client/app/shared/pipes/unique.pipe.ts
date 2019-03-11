import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(input: string, key: number): string[] {
    let unique = {};
    let uniqueList = [];
    if (input) {
      for (let i = 0; i < input.length; i++) {
        if (typeof unique[input[i][key]] === 'undefined') {
          unique[input[i][key]] = '';
          uniqueList.push(input[i]);
        }
      }
    }
    return uniqueList;
  }

}
