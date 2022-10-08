import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { globalvars } from '../global-vars';
import { MyLocalStorage } from '../myLocalStorage';

@Component({
  selector: 'app-single-listing',
  templateUrl: './single-listing.component.html',
  styleUrls: ['./single-listing.component.css'],
})
export class SingleListingComponent implements OnInit {
  property: any;
  propertyPics: any = [];
  estateLogo: any;
  id: any = 0;
  authenticated: boolean = false;
  currentUrl: string = '/';
  private readonly imageType: string = 'data:image/PNG;base64,';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private myLocalStorage: MyLocalStorage
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    this.currentUrl = this.router.url;

    this.getProperty();
    this.getPropertyPictures();
    this.recordView();
  }

  calcDaysDifference(uploadDate: string): number {
    // To set two dates to two variables
    var date1 = new Date(uploadDate);
    var date2 = new Date();

    var Time = date2.getTime() - date1.getTime();
    var Days = Time / (1000 * 3600 * 24); //Diference in Days
    return Math.round(Days);
  }

  getProperty(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpropertiesbyid', {
        params: {
          id: this.id,
        },
      })
      .then((response) => {
        this.property = response.data;
        console.log(this.property);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPropertyPictures(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpicturefilesbypropertiesid', {
        params: {
          propertiesId: this.id,
        },
      })
      .then((response) => {
        response.data.forEach((data: { content: any }) => {
          this.propertyPics.push(
            this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  recordView(): void {
    var ipAdrress: string = '';
    if (sessionStorage.getItem('viewIp') === undefined) {
      axios
        .get('http://api.ipify.org/?format=json')
        .then((response) => {
          ipAdrress = response.data.ip;
          sessionStorage.setItem('viewIp', ipAdrress);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      ipAdrress = sessionStorage.getItem('viewIp')!;
    }
    axios
      .post(environment.apiURL + 'africanscity/recordpropertyview', null, {
        params: { ip: ipAdrress, propertyId: this.id },
      })
      .then((response) => {
        console.log('Recorded!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
