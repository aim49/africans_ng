import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { globalvars } from '../global-vars';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { MyLocalStorage } from '../myLocalStorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string = '';
  returnUrl: string = '';
  credentials = { email: '', password: '' };
  authenticated: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private myLocalStorage: MyLocalStorage
  ) {}

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log(this.route);
    this.route.queryParams.subscribe((params) => {
      this.error = params['error'];
      this.returnUrl = params['returnUrl'];
    });
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    if (this.authenticated === true) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  loginSend(): void {
    axios
      .post(
        globalvars.authURL +
          'username=' +
          this.credentials.email +
          '&password=' +
          this.credentials.password,
        null,
        {
          headers: {
            Authorization:
              'Basic ' + btoa('my-trusted-client' + ':' + 'secret'),
          },
        }
      )
      .then((response) => {
        let expiry = Number(response.data.expires_in) * 1000;
        this.myLocalStorage.setItem('authenticated', '1', expiry);
        this.myLocalStorage.setItem(
          'accessToken',
          response.data.access_token,
          expiry
        );
        this.myLocalStorage.setItem(
          'expiresIn',
          response.data.expires_in,
          expiry
        );
        this.myLocalStorage.setItem(
          'tokenType',
          response.data.token_type,
          expiry
        );
        this.myLocalStorage.setItem('scope', response.data.scope, expiry);
        this.myLocalStorage.setItem('time', new Date().toISOString(), expiry);
        this.myLocalStorage.setItem(
          'authHeaderString',
          response.data.token_type + ' ' + response.data.access_token,
          expiry
        );
        axios
          .get(environment.apiURL + 'africanscity/loggedinuserfullname', {
            headers: {
              Authorization: localStorage.getItem('authHeaderString')!,
            },
          })
          .then((res) => {
            this.myLocalStorage.setItem('userFullName', res.data, expiry);
            // this.router.navigateByUrl(this.returnUrl);
          })
          .catch((error) => console.log(error));

        axios
          .get(environment.apiURL + 'africanscity/loggedinuserrole', {
            headers: {
              Authorization: localStorage.getItem('authHeaderString')!,
            },
          })
          .then((res) => {
            this.myLocalStorage.setItem('role', res.data, expiry);
            if (res.data === 'ADMIN') {
              this.router.navigateByUrl('/admin/adminlayout');
            } else {
              this.router.navigateByUrl(this.returnUrl);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
        this.router.navigateByUrl('/login?error=err');
      });
  }
}
