import { CrudService } from './../../shared/services/crud.service';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class ProductResolve implements Resolve<any> {

    constructor(private crud: CrudService, private router: Router, private snack: MatSnackBar) { }

    resolve(route: ActivatedRouteSnapshot) {
        let id = route.params['id'];
        return this.crud.getOne('products/deep', id, false);
    }
}