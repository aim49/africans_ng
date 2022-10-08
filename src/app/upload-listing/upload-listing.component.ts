import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyLocalStorage } from '../myLocalStorage';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { globalvars } from '../global-vars';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-upload-listing',
  templateUrl: './upload-listing.component.html',
  styleUrls: ['./upload-listing.component.css'],
})
export class UploadListingComponent implements OnInit {
  authenticated: boolean = false;
  property: any = {
    id: 0,
    role: '',
    // Real Estate logo path - can be null
    logo: '',
    // Real Estate name - can be null
    stateName: '',
    address: '',
    area: '',
    city: '',
    country: '',
    googleLocation: '',
    type: '',
    size: '',
    price: 0,
    description: '',
    status: '',
    numGarage: 0,
    numRoom: 0,
    numBathroom: 0,
    numToilet: 0,
    // pictures: [''],
    // Real Estate logo at save - can be null
    logoPic: null,
    user: { id: 0 },
  };
  propertyStatuses = [{ property: '', value: '' }];
  roles = [{ property: '', value: '' }];
  countries = [{ property: '', value: '' }];
  propertyTypes = [];
  uploaderType = '';
  public file: any;
  urls: any[] = [];
  urls2: any[] = [];
  multiples: any[] = [];
  multiples2: any[] = [];
  logos: any[] = [];
  editing: boolean = false;
  editingId: number = 0;
  formData = new FormData();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private myLocalStorage: MyLocalStorage,
    private cf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;
    } else {
      this.authenticated = false;
      this.router.navigateByUrl('/login?returnUrl=' + this.router.url);
    }

    if (this.authenticated == true) {
      this.getPropertyStatuses();
      this.getRoles();
      this.getCountries();
      this.getPropertyTypes();
      this.route.queryParams.subscribe((params) => {
        if (
          params['id'] !== null &&
          params['id'] !== undefined &&
          params['id'] !== ''
        ) {
          this.editing = true;
          this.editingId = params['id'];
          this.getPropertyForEditing();
        }
        if (
          params['userId'] !== null &&
          params['userId'] !== undefined &&
          params['userId'] !== ''
        ) {
          this.property.user.id = params['userId'];
        }
      });
    }
  }

  tryPreview(): void {
    console.log('Trying preview!');
  }

  onSelectFile(event: any) {
    this.file = event.target.files && event.target.files.length;
    if (this.file > 0 && this.file < 5) {
      let i: number = 0;
      for (const singlefile of event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(singlefile);
        this.urls.push(singlefile);
        this.cf.detectChanges();
        i++;
        console.log(this.urls);
        reader.onload = (event) => {
          const url = (<FileReader>event.target).result as string;
          this.multiples.push(url);
          this.cf.detectChanges();
        };
        this.multiples2.push(singlefile);
      }
    }
    // else {
    //   this.toast.error('No More than 4 images', 'Upload Images')
    // }
  }

  removeImages(i: number) {
    this.multiples.splice(i, 1);
  }

  onSelectLogoFile(event: any) {
    this.file = event.target.files && event.target.files.length;
    if (this.file > 0 && this.file < 5) {
      let i: number = 0;
      for (const singlefile of event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(singlefile);
        this.urls2.push(singlefile);
        this.cf.detectChanges();
        i++;
        console.log(this.urls2);
        reader.onload = (event) => {
          const url = (<FileReader>event.target).result as string;
          this.property.logoPic = url;
          this.cf.detectChanges();
        };
        this.formData.delete('logoPic');
        this.formData.append('logoPic', singlefile);
      }
    }
    // else {
    //   this.toast.error('No More than 4 images', 'Upload Images')
    // }
  }

  uploadListing(): void {
    console.log(this.property);
    console.log(this.multiples2);
    // if (this.property.logoPic === null) {
    delete this.property.logoPic;
    this.formData.append('user.id', this.property.user.id);
    delete this.property.user;
    // }
    for (let i = 0; i < this.multiples2.length; i++) {
      this.formData.append('pictures', this.multiples2[i]);
    }
    for (var key in this.property) {
      this.formData.append(key, this.property[key]);
    }
    axios
      .post(environment.apiURL + 'africanscity/saveproperties', this.formData, {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(this.property);
        this.router.navigateByUrl('/');
        this.ngOnInit();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPropertyForEditing(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpropertiesbyid', {
        params: {
          id: this.editingId,
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

  getPropertyStatuses(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpropertystatuses', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.propertyStatuses = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getRoles(): void {
    axios
      .get(environment.apiURL + 'africanscity/getroles', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.roles = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCountries(): void {
    axios
      .get(environment.apiURL + 'africanscity/getcountries', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.countries = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPropertyTypes(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpropertytypes', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.propertyTypes = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
