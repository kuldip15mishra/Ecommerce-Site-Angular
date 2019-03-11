import { ModalService } from './../../modal/modal.service';
import { CrudService } from './../../shared/services/crud.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CheckoutGuard implements CanActivate {
  constructor(private router: Router, private crud: CrudService, private modal: ModalService) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.crud.get('users/me', null, true)
      .map(e => { if (e) { return true; } }).catch(() => {
        this.modal.login().subscribe(data => { if (data) { this.router.navigateByUrl('/checkout') } });
        return Observable.of(false);
      });
  }
}