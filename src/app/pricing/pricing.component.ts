import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { MyLocalStorage } from '../myLocalStorage';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent implements OnInit {
  authenticated: boolean = false;
  packages: any = [];

  constructor(
    private myLocalStorage: MyLocalStorage,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;
      this.getPackages();
    } else {
      this.authenticated = false;
      this.router.navigateByUrl('/login?returnUrl=' + this.router.url);
    }
  }

  getPackages(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpackagesall', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data[2].description);
        this.packages = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getBreaksFromNewLines(descri: String): any {
    var descriptionLines = descri.split('\r\n');
    return descriptionLines;
  }
}
