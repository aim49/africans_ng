import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { MyLocalStorage } from 'src/app/myLocalStorage';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css'],
})
export class AdminNavigationComponent implements OnInit {
  authenticated: boolean = false;
  constructor(private router: Router, private myLocalStorage: MyLocalStorage) {}

  ngOnInit(): void {
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;

      let logInTime = new Date(this.myLocalStorage.getItem('time')!);
      let currentTime = new Date();
      let timeDiff = currentTime.getTime() - logInTime.getTime();
      let expiry = Number(this.myLocalStorage.getItem('expiresIn')!) * 1000;
      if (timeDiff > expiry) {
        this.myLocalStorage.clear();
        this.router.navigateByUrl('/');
      } else {
        this.myLocalStorage.reApplyExpiryTimeout(expiry - timeDiff);
      }
    } else {
      this.authenticated = false;
      this.router.navigateByUrl('/login?returnUrl=' + this.router.url);
    }
    if (
      this.myLocalStorage.getItem('role')! !== 'ADMIN' &&
      this.router.url.includes('admin')
    ) {
      this.router.navigateByUrl('/');
    }

    $('.navbar-open-btn').click(function () {
      $('.navigation-sidebar').addClass('show-navigation-sidebar');
      $('.navigation-overlay').css('display', 'block');
    });

    $('.navbar-close-btn').click(function () {
      $('.navigation-sidebar').removeClass('show-navigation-sidebar');
      $('.navigation-overlay').css('display', 'none');
    });

    $(window).click(function (e) {
      if ($(e.target).hasClass('navigation-overlay')) {
        $('.navigation-sidebar').removeClass('show-navigation-sidebar');
        $('.navigation-overlay').css('display', 'none');
      }
    });
  }
}
