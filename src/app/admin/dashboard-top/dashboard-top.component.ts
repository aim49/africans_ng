import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { MyLocalStorage } from 'src/app/myLocalStorage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-top',
  templateUrl: './dashboard-top.component.html',
  styleUrls: ['./dashboard-top.component.css'],
})
export class DashboardTopComponent implements OnInit {
  constructor(private myLocalStorage: MyLocalStorage, private router: Router) {}

  ngOnInit(): void {}

  logoutSend(): void {
    // if (this.authenticated === true) {
    axios
      .post(environment.apiURL + 'logoff', null, {
        headers: { Authorization: localStorage.getItem('authHeaderString')! },
      })
      .then((response) => {
        this.myLocalStorage.clear();
        this.router.navigateByUrl('/');
        this.ngOnInit();
      });
    // }
  }
}
