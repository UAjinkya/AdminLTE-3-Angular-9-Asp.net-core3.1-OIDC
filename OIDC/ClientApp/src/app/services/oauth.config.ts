import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
//debugger;
let url = window.location.origin;
//let finalUrl = url.slice(0, -1);
export const oAuthDevelopmentConfig: AuthConfig = {

  clientId: 'OIDCSPA',
  scope: 'openid offline_access WebAPI profile roles',
  oidc: false,
  issuer: window.location.origin,
  requireHttps: false
};

export const oAuthProductionConfig: AuthConfig = {

  clientId: 'OIDCSPA',
  scope: 'openid offline_access WebAPI profile roles',
  oidc: true,
  issuer: url,
  requireHttps: false

};


/**
 * angular-oauth2-oidc configuration.
 */
@Injectable() export class OAuthConfig {

  constructor(private oAuthService: OAuthService) { }

  load(): Promise<object> {
    
    let url: string;

    // Development & Staging environments.
    this.oAuthService.configure(oAuthDevelopmentConfig);

    url = window.location.origin + ".well-known/openid-configuration";

    // Defines the storage.
    this.oAuthService.setStorage(localStorage);
    //this.oAuthService.dummyClientSecret = "ajinkya";
    // Loads Discovery Document.
    return this.oAuthService.loadDiscoveryDocument(url);
    
  }

}

