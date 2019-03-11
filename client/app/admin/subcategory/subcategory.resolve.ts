import { CrudService } from '../../shared/services/crud.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class SubCategoryResolve implements Resolve<any> {

  constructor(private crud: CrudService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.params['id'];
    return (id === 'add' || id === 'new') ? {} : this.crud.getOne('subcategory', id);
  }
}