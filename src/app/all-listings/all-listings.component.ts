import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { globalvars } from '../global-vars';

@Component({
  selector: 'app-all-listings',
  templateUrl: './all-listings.component.html',
  styleUrls: ['./all-listings.component.css'],
})
export class AllListingsComponent implements OnInit {
  propertiesCounts: any = [];
  propertiesCities: any = [];
  oderBy: string = '';
  propertyType: string = '';
  propertyStatus: string = '';
  city: string = '';
  page: number = 0;
  size: number = 25;
  totalProperties: number = 0;
  totalPages: number = 0;
  pageFirst: number = 0;
  pageLast: number = 0;
  first: boolean = true;
  last: boolean = false;
  properties: any = [];
  images: any = [];
  private readonly imageType: string = 'data:image/PNG;base64,';

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.oderBy = params['oderBy'];
      this.propertyType = params['propertyType'];
      this.propertyStatus = params['propertyStatus'];
      this.city = params['city'];
    });

    axios
      .get(environment.apiURL + 'africanscity/getpropertiescounts', {})
      .then((response) => {
        this.propertiesCounts = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(environment.apiURL + 'africanscity/getpropertiescities', {})
      .then((response) => {
        this.propertiesCities = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    this.getProperties();
  }

  changeOrderBy(newOderBy: string): void {
    this.oderBy = newOderBy;
    this.getProperties();
  }

  getProperties(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpaginatedproperties', {
        params: {
          propertyType: this.propertyType,
          propertyStatus: this.propertyStatus,
          orderBy: this.oderBy,
          city: this.city,
          page: this.page,
          size: this.size,
        },
      })
      .then((response) => {
        this.properties = response.data.content;
        this.page = response.data.pageable.pageNumber;
        this.size = response.data.pageable.pageSize;
        this.totalProperties = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.pageFirst = response.data.pageable.offset + 1;
        this.pageLast =
          response.data.numberOfElements + response.data.pageable.offset;
        this.first = response.data.first;
        this.last = response.data.last;
        this.getPropertyImage(this.properties);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPropertyImage(propertiesArray: any): void {
    propertiesArray.forEach((property: { id: any }) => {
      axios
        .get(
          environment.apiURL +
            'africanscity/getcompressedpicturefilebypropertiesid',
          {
            params: { propertiesId: property.id },
          }
        )
        .then((response) => {
          this.images.push(
            this.sanitizer.bypassSecurityTrustUrl(
              this.imageType + response.data.content
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  changePageSize(): void {
    // this.size = newPageSize;
    this.getProperties();
  }

  getNextPage(): void {
    this.page = this.page + 1;
    this.getProperties();
  }

  getPrevousPage(): void {
    this.page = this.page - 1;
    this.getProperties();
  }

  getFirstPage(): void {
    this.page = 0;
    this.getProperties();
  }

  getLastPage(): void {
    this.page = this.totalPages - 1;
    this.getProperties();
  }
}
