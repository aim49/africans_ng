import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { MyLocalStorage } from '../myLocalStorage';

@Component({
  selector: 'app-confrim-pay',
  templateUrl: './confrim-pay.component.html',
  styleUrls: ['./confrim-pay.component.css'],
})
export class ConfrimPayComponent implements OnInit {
  authenticated: boolean = false;
  paynows: any = [];
  msg: String = '';
  err: String = '';

  displayedColumns: string[] = [
    'ref',
    'method',
    'amount',
    'createdAt',
    'updatedAt',
    // 'endDate',
    // 'id',
    // 'payable_id',
    // 'payable_type',
    'status',
    'actions',
  ];
  dataSource = this.paynows;
  constructor(private myLocalStorage: MyLocalStorage, private router: Router) {}

  ngOnInit(): void {
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;
      this.getPaynowsAll();
    } else {
      this.authenticated = false;
      this.router.navigateByUrl('/login?returnUrl=' + this.router.url);
    }
  }

  getPaynowsAll(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpaynowsallbyuserid', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // console.log(response.data);
        this.paynows = response.data;
        this.dataSource = this.paynows;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // --------------------------------------------------------------------------------------
  // RECREATING THE FUNCTIONALITIES WITH MANUAL POLL INITIATION
  // --------------------------------------------------------------------------------------
  checkPaynowStatus(paynowId: number): void {
    axios
      .get(environment.apiURL + 'africanscity/pollpaynowstatusbypaynowsid', {
        params: {
          paynowsId: paynowId,
        },
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.data.msg !== '') {
          this.msg = response.data.msg;
          // console.log(response.data.msg);
        }
        if (response.data.err) {
          this.err = response.data.err;
          // console.log(response.data.err);
        }
        this.ngOnInit();
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.data.trace !== undefined &&
          error.response.data.trace.includes('ConnectionException')
        ) {
          this.err = 'Failed to connect to paynow';
          this.msg = '';
        }
      });
  }
}
