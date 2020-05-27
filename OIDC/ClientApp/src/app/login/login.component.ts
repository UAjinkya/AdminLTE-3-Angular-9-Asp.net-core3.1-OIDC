import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthenticationService } from '../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: any;
  password: any;
  rememberMe: boolean;
  error: any;
  token: string;
  constructor(protected router: Router, private oauthService: OAuthService, protected authenticationService: AuthenticationService) {
    this.userName = '';
    this.password = '';
  }

  ngOnInit() {
  }

  login() {

    this.oauthService
      .fetchTokenUsingPasswordFlowAndLoadUserProfile(this.userName, this.password)
      .then(() => {

        this.authenticationService.init();
        // Strategy for refresh token through a scheduler.
        this.authenticationService.scheduleRefresh();
        this.token = this.oauthService.getAccessToken();
        this.router.navigate(['/dashboard']);


      })
      .catch((errorResponse: HttpErrorResponse) => {

        // Checks for error in response (error from the Token endpoint).
        if (errorResponse.error !== '') {
          switch (errorResponse.error.error) {
            case 'invalid_grant':
              //this.errorMessages.push({ description: 'Invalid Username or password.' });
              alert("Invalid Username or password..!!");
              break;
            default:
              //this.errorMessages.push({ description: 'Unexpected error. Try again.' });
              alert("Unexpected error. Try again..!!");
          }
        } else {
          //this.errorMessages.push({ description: 'Server error. Try later.' });
          alert("Server error. Try later..!!");
        }
      });
  }
}
