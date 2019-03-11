import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oauth-buttons',
  templateUrl: './oauth-buttons.html',
  styleUrls: ['./oauth-buttons.css'],
})
export class OauthButtonsComponent implements OnInit {
  googleLoading: boolean = false;
  facebookLoading: boolean = false;
  twitterLoading: boolean = false;
  constructor() {
  }
  ngOnInit() {
  }
  loginOauth(provider: string) {
    window.location.href = `/auth/${provider}`;
  };
}
