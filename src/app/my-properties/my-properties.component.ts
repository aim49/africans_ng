import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { MyLocalStorage } from '../myLocalStorage';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css'],
})
export class MyPropertiesComponent implements OnInit, AfterViewInit {
  authenticated: boolean = false;
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

  @ViewChild('dataTable', { static: false }) table: any;
  dataTable: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private myLocalStorage: MyLocalStorage
  ) {}

  ngOnInit(): void {
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;
      this.getProperties();
    } else {
      this.authenticated = false;
      this.router.navigateByUrl('/login?returnUrl=' + this.router.url);
    }
  }
  ngAfterViewInit(): void {}

  getProperties(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpropertiesbyloggedinuser', {
        params: {
          page: this.page,
          size: this.size,
        },
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
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

  deleteProperty(id: any): void {
    axios
      .post(environment.apiURL + 'africanscity/deletepropertybyid', null, {
        params: { id: id },
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.ngOnInit();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
