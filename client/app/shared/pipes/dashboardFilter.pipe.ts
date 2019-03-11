import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dashboardFilter' })
export class DashboardFilterPipe implements PipeTransform {
  transform(items: any, term: string): any {
    if (term === undefined) return items;
    return items.filter((item: any) => item.dashboard);
  }
}
