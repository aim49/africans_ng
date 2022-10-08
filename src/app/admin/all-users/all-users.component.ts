import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { MyLocalStorage } from 'src/app/myLocalStorage';
import { TableService } from 'src/app/table.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  users: any = [];

  displayedColumns = [
    'title',
    'name',
    'lastname',
    'username',
    'email',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  constructor(
    private route: ActivatedRoute,
    private service: TableService,
    private myLocalStorage: MyLocalStorage,
    private router: Router
  ) {}

  ngOnInit(): void {
    var userType: any;
    this.route.queryParams.subscribe((params) => {
      userType = params['type'];
      if (userType === 'customers') {
        this.getCustomers();
      } else if (userType === 'propertyOwners') {
        this.getPropertyOwners();
      } else {
        this.getUsersAll();
      }
    });
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  getUsersAll(): void {
    axios
      .get(environment.apiURL + 'africanscity/getusersall', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.users = response.data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPropertyOwners(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpropertyowners', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.users = response.data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCustomers(): void {
    axios
      .get(environment.apiURL + 'africanscity/getcustomers', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.users = response.data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUser(userId: any): void {
    axios
      .post(environment.apiURL + 'africanscity/deleteuser', null, {
        params: { userId: userId },
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

  addForOther(userId: any): void {
    var url = '/upload-listing?userId=' + userId;
    this.router.navigateByUrl(url);
  }
}
