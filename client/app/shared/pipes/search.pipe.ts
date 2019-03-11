import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchpipe',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(data: any[], searchTerm: string): any[] {
        if (!data || !searchTerm) return;
        searchTerm = searchTerm.toUpperCase();
        return data.filter(item => {
            if (item.q)
                return item.q.toString().toUpperCase().indexOf(searchTerm) !== -1
            else
                return null;
        });
    }
}