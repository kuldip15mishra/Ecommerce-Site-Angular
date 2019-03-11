import { AuthService } from './../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
  }
  ngOnInit() {
    var vm = this;
    this.auth.logout();
    // vm.router.navigateByUrl("/");
  }
}
