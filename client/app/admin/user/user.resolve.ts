import { CrudService } from './../../shared/services/crud.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class UserResolve implements Resolve<any> {

  constructor(private crud: CrudService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.params['id'];
    return (id === 'add' || id === 'new') ? undefined : this.crud.getOne('users', id, true);
  }
}