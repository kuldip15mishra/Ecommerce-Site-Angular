import { ModalService } from './../../modal/modal.service';
import { CrudService } from './../../shared/services/crud.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductsGuard implements CanActivate {
    constructor(private router: Router, private crud: CrudService, private modal: ModalService) { }
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.crud.get('products', true)
            .map(e => { if (e) { return true; } }).catch(() => {
                this.modal.login().subscribe();
                return Observable.of(false);
            });
    }
}