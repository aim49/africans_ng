import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
// import { Paynow } from 'paynow';
// import * as Paynow from 'paynow'
import { Paynow } from 'paynow';
import { environment } from 'src/environments/environment';
import { MyLocalStorage } from '../myLocalStorage';

@Component({
  selector: 'app-single-package',
  templateUrl: './single-package.component.html',
  styleUrls: ['./single-package.component.css'],
})
export class SinglePackageComponent implements OnInit {
  authenticated: boolean = false;
  packageId: number = 0;
  months: number = 0;
  phoneNumber: number = 0;
  mobileMoneyMethod: String = '';
  mobileMoneyMethods: any = [];
  webCurrency: String = 'USD';
  paynowsId: number = 0;
  msg: String = '';
  err: String = '';

  constructor(
    private myLocalStorage: MyLocalStorage,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;
      this.getMobileMoneyMethods();
      this.route.queryParams.subscribe((params) => {
        this.packageId = params['packageId'];
      });
    } else {
      this.authenticated = false;
      this.router.navigateByUrl('/login?returnUrl=' + this.router.url);
    }
  }

  confirmPaynowMobile(): void {
    // axios
    //   .get(environment.apiURL + 'africanscity/getpaynowmobileconfirmation', {
    axios
      .get(environment.apiURL + 'africanscity/startpaynowmobileconfirmation', {
        params: {
          mobile: this.phoneNumber,
          packageId: this.packageId,
          months: this.months,
          mobileMoneyMethod: this.mobileMoneyMethod,
        },
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // var res = response.data;
        // alert('Close alert when done confirming on mobile');
        // this.pollPaynowStatus(res.pollUrl);
        this.paynowsId = response.data;
        this.router.navigateByUrl('/comfirm-payment');
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.data.trace !== undefined &&
          error.response.data.trace.includes('ConnectionException')
        ) {
          this.err = 'Failed to connect to paynow';
          this.msg = '';
          console.log(this.err);
        }
      });
  }

  confirmPaynowWeb(): void {
    // axios
    //   .get(environment.apiURL + 'africanscity/getpaynowwebconfirmation', {
    axios
      .get(environment.apiURL + 'africanscity/startpaynowwebconfirmation', {
        params: {
          packageId: this.packageId,
          months: this.months,
        },
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // console.log(response.data);
        // var res = response.data;
        // // var redirectUrl = response.data;
        // var paynowweb = window.open(res.redirectURL);
        // const timer = setInterval(() => {
        //   if (paynowweb?.closed) {
        //     clearInterval(timer);
        //     this.pollPaynowStatus(res.pollUrl);
        //   }
        // }, 500);
        this.paynowsId = response.data;
        this.router.navigateByUrl('/comfirm-payment');
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

  pollPaynowStatus(pollUrl: String): void {
    axios
      .get(environment.apiURL + 'africanscity/pollpaynowstatus', {
        params: {
          packageId: this.packageId,
          pollUrl: pollUrl,
        },
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.data.msg !== '') {
          this.msg = response.data.msg;
          console.log(response.data.msg);
        }
        if (response.data.err) {
          this.err = response.data.err;
          console.log(response.data.err);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getMobileMoneyMethods(): void {
    axios
      .get(environment.apiURL + 'africanscity/getmobilemoneymethods', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        this.mobileMoneyMethods = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // --------------------------------------------------------------------------------------
  // RECREATING THE FUNCTIONALITIES WITH MANUAL POLL INITIATION
  // --------------------------------------------------------------------------------------
  checkPaynowStatus(): void {
    axios
      .get(environment.apiURL + 'africanscity/pollpaynowstatusbypaynowsid', {
        params: {
          paynowsId: this.paynowsId,
        },
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.data.msg !== '') {
          this.msg = response.data.msg;
          console.log(response.data.msg);
        }
        if (response.data.err) {
          this.err = response.data.err;
          console.log(response.data.err);
        }
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
