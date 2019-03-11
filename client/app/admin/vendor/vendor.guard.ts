import { CrudService } from './../../shared/services/crud.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../shared/services/auth.service';
@Injectable()
export class VendorGuard implements CanActivate {
    constructor(private auth: AuthService,private router: Router, private crud: CrudService) { }
   
   
    canActivate():boolean {
        if (this.auth.loggedIn && this.auth.currentUser.role ==='admin') {
           // return this.router.navigate(['/admin/vendor']);
            return true;
        }else{
 
            this.router.navigate(['**']);
            return false;
               }
      
       
      
    }
}