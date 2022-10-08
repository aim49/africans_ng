import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';
import { MyLocalStorage } from 'src/app/myLocalStorage';
import { TableService } from 'src/app/table.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  properties: any = [];
  displayedColumns = [
    'address',
    'area',
    'city',
    'country',
    'type',
    'price',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  constructor(
    private service: TableService,
    private myLocalStorage: MyLocalStorage
  ) {}

  ngOnInit(): void {
    this.getPropertiesAll();
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  getPropertiesAll(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpropertiesall', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.properties = response.data;
        this.dataSource = new MatTableDataSource(this.properties);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteProperty(propertyId: any): void {
    axios
      .post(environment.apiURL + 'africanscity/deletepropertybyid', null, {
        params: { id: propertyId },
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // this.router.navigateByUrl('/');
        this.ngOnInit();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
