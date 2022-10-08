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
  selector: 'app-packages',
  templateUrl: './packages.edit.component.html',
  styleUrls: ['./packages.edit.component.css'],
})
export class PackagesEditComponent implements OnInit {
  package = { name: '', description: '', price: 0 };
  id: any = 0;
  displayedColumns = ['package_name', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  constructor(
    private service: TableService,
    private myLocalStorage: MyLocalStorage,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var id: any = 0;
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      id = params['id'];
    });
    if (id !== undefined) {
      this.getPackagesAllById(id);
    }
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  getPackagesAllById(id: any): void {
    axios
      .get(environment.apiURL + 'africanscity/getpackagesallbyid', {
        params: { id: id },
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.package = response.data;
        // console.log(this.package);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  savePackage(): void {
    axios
      .post(environment.apiURL + 'africanscity/savepackages', this.package, {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // this.router.navigateByUrl('/');
        this.router.navigateByUrl('/admin/createPackages');
        this.ngOnInit();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
