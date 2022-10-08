import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MyLocalStorage } from 'src/app/myLocalStorage';
import axios from 'axios';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css'],
})
export class AdminlayoutComponent implements OnInit {
  propertiesTotal: number = 0;
  customersTotal: number = 0;
  propertyOwnersTotal: number = 0;
  authenticated: boolean = false;
  constructor(private myLocalStorage: MyLocalStorage) {}

  ngOnInit(): void {
    this.getPropertiesTotal();
    this.getPropertyOwnersTotal();
    this.getCustomersTotal();
  }

  getPropertiesTotal(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpropertiestotal', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.propertiesTotal = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPropertyOwnersTotal(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpropertyownerstotal', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.propertyOwnersTotal = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCustomersTotal(): void {
    axios
      .get(environment.apiURL + 'africanscity/getcustomerstotal', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.customersTotal = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
