import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { oAuthDevelopmentConfig } from './services/oauth.config';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
  public title: Title, private oAuthService: OAuthService, private authenticationService: AuthenticationService, private router: Router)
  {
    this.configureCodeFlow();
  }
  configureCodeFlow()
  {
    //debugger;
    let url = location.origin + "/.well-known/openid-configuration";
    //if normal flow use this

    this.oAuthService.configure(oAuthDevelopmentConfig);
    this.oAuthService.setStorage(localStorage);
    // Loads Discovery Document.
    this.oAuthService.loadDiscoveryDocument(url);
  }
}
