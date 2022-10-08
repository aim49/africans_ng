import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { globalvars } from '../global-vars';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { MyLocalStorage } from '../myLocalStorage';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  authenticated: boolean = false;
  role: string = '';
  userFullName: string = '';
  propertiesCounts: any = [];
  currentUrl: string = '/';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private myLocalStorage: MyLocalStorage
  ) {}

  ngOnInit(): void {
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;
      this.userFullName = this.myLocalStorage.getItem('userFullName')!;
      this.role = this.myLocalStorage.getItem('role')!;

      let logInTime = new Date(this.myLocalStorage.getItem('time')!);
      let currentTime = new Date();
      let timeDiff = currentTime.getTime() - logInTime.getTime();
      let expiry = Number(this.myLocalStorage.getItem('expiresIn')!) * 1000;
      if (timeDiff > expiry) {
        this.myLocalStorage.clear();
      } else {
        this.myLocalStorage.reApplyExpiryTimeout(expiry - timeDiff);
      }
      if (this.role === 'ADMIN') {
        if (
          !this.router.url.includes('/upload-listing') &&
          !this.router.url.includes('/property')
        ) {
          this.router.navigateByUrl('/admin/adminlayout');
        }
      }
      if (this.role !== 'ADMIN' && this.router.url.includes('admin')) {
        this.router.navigateByUrl('/');
      }
    } else {
      this.authenticated = false;
    }
    axios
      .get(environment.apiURL + 'africanscity/getpropertiescounts', {})
      .then((response) => {
        this.propertiesCounts = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.currentUrl = this.router.url;
  }

  logoutSend(): void {
    if (this.authenticated === true) {
      axios
        .post(environment.apiURL + 'logoff', null, {
          headers: { Authorization: localStorage.getItem('authHeaderString')! },
        })
        .then((response) => {
          this.myLocalStorage.clear();
          this.router.navigateByUrl('/');
          this.ngOnInit();
        });
    }
  }

  customRouterLink(url: string): void {
    this.router.navigateByUrl(url);
  }
}
