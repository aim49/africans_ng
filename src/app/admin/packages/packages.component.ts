import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';
import { MyLocalStorage } from 'src/app/myLocalStorage';
import { TableService } from 'src/app/table.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent implements OnInit {
  packages: any = [];
  displayedColumns = ['package_name', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  constructor(
    private service: TableService,
    private myLocalStorage: MyLocalStorage
  ) {}

  ngOnInit(): void {
    this.getPackagesAll();
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  getPackagesAll(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpackagesall', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.packages = response.data;
        this.dataSource = new MatTableDataSource(this.packages);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deletePackage(packagesId: any): void {
    axios
      .post(environment.apiURL + 'africanscity/deletepackagesbyid', null, {
        params: { id: packagesId },
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
