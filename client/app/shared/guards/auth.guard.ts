import { ModalService } from './../../modal/modal.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthService, private modal: ModalService) { }

    canActivate() {
        if (this.auth.loggedIn) {
            return true;
        }
        this.modal.login().subscribe();

        // this.router.navigate(['/account/login']);
        return false;
    }
}