import { CrudService } from './../../shared/services/crud.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OrderGuard implements CanActivate {
    constructor(private router: Router, private crud: CrudService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let id = route.params['id'];
        return (id === 'add' || id === 'new') ? true : this.crud.getOne('orders', id)
            .map(e => {
                if (e) { return true; }
            }).catch(() => {
                this.router.navigate(['/admin/order']);
                return Observable.of(false);
            });
    }
}