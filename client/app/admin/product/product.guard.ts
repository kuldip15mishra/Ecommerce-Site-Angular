import { CrudService } from './../../shared/services/crud.service';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductGuard implements CanActivate {
    constructor(private router: Router, private crud: CrudService) { }
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let id = route.params['id'];
        return (id === 'add' || id === 'new') ? true : this.crud.getOne('products', id)
            .map(e => {
                if (e) { return true; }
            }).catch(() => {
                this.router.navigate(['/admin/product']);
                return Observable.of(false);
            });
    }
}