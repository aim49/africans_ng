import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyLocalStorage } from '../myLocalStorage';
import { environment } from 'src/environments/environment';
import { globalvars } from '../global-vars';
import axios from 'axios';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-listed-listings',
  templateUrl: './listed-listings.component.html',
  styleUrls: ['./listed-listings.component.css'],
})
export class ListedListingsComponent implements OnInit {
  randomForRentProperties: any = [];
  randomForSaleProperties: any = [];
  forRentImages: any = [];
  forSaleImages: any = [];
  apiPicturesBaseUrl =
    environment.apiURL + 'africanscity/getpicturefilebypathuri?pathUri';
  private readonly imageType: string = 'data:image/PNG;base64,';

  constructor(
    private router: Router,
    private myLocalStorage: MyLocalStorage,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    axios
      .get(
        environment.apiURL +
          'africanscity/getfourrandomshowcasepropertiesdtoforrent',
        {}
      )
      .then((response) => {
        this.randomForRentProperties = response.data;
        this.getPropertyImage(response.data, 'RENT');
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        environment.apiURL +
          'africanscity/getfourrandomshowcasepropertiesdtoforsale',
        {}
      )
      .then((response) => {
        this.randomForSaleProperties = response.data;
        this.getPropertyImage(response.data, 'SALE');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPropertyImage(propertiesArray: any, rentOrSale: string): void {
    propertiesArray.forEach(
      (property: { pictureUri: String; picture: any }) => {
        axios
          .get(environment.apiURL + 'africanscity/getpicturefilebypathuri', {
            params: { pathUri: property.pictureUri },
          })
          .then((response) => {
            if (rentOrSale === 'RENT') {
              this.forRentImages.push(
                this.sanitizer.bypassSecurityTrustUrl(
                  this.imageType + response.data.content
                )
              );
            } else {
              this.forSaleImages.push(
                this.sanitizer.bypassSecurityTrustUrl(
                  this.imageType + response.data.content
                )
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }

  headerFirst: string = 'Rental property';

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
}
