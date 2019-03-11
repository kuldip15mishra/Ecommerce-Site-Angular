import { CrudService } from './../../shared/services/crud.service';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class CategoryResolve implements Resolve<any> {

    constructor(private crud: CrudService, private router: Router, private snack: MatSnackBar) { }

    resolve(route: ActivatedRouteSnapshot) {
        let id = route.params['id'];
        return this.crud.get('products/categories/' + id);
    }
}