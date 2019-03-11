import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelcase'
})
export class LabelcasePipe implements PipeTransform {

  transform(input: string): string {
    if ((typeof input) !== 'string') {
      return input;
    }
    return input.length > 0 ? input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase())) : '';
  }

}
