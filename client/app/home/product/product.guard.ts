import { CrudService } from './../../shared/services/crud.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductGuard implements CanActivate {
    constructor(private router: Router, private crud: CrudService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let id = route.params['id'];
        return this.crud.getOne('products', id)
            .map(e => {
                if (e) { return true; }
            }).catch(err => {
                this.router.navigate(['/shop']);
                return Observable.of(false);
            });
    }
}