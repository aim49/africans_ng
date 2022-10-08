import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { globalvars } from '../global-vars';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { MyLocalStorage } from '../myLocalStorage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  authenticated: boolean = false;
  user = {
    id: 0,
    title: '',
    surname: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    emailVerifiedAt: new Date(),
    password: '',
    country: '',
    rememberToken: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorities: [],
    oldPassword: '',
  };
  titles = [];
  countries = [{ property: '', value: '' }];
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordsError: string = '';

  constructor(private router: Router, private myLocalStorage: MyLocalStorage) {}

  ngOnInit(): void {
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }

    if (this.authenticated === false) {
      this.router.navigateByUrl('/login?returnUrl=' + this.router.url);
    } else {
      axios
        .get(environment.apiURL + 'africanscity/loggedinuser', {
          headers: {
            Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          },
        })
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(environment.apiURL + 'africanscity/gettitles', {
          headers: {
            Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          },
        })
        .then((response) => {
          this.titles = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

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
  }

  updateProfile(): void {
    this.user.authorities = [];
    axios
      .post(environment.apiURL + 'africanscity/saveuser', this.user, {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        this.router.navigateByUrl('/');
        this.ngOnInit();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updatePassword(): void {
    this.user.authorities = [];
    if (this.newPassword !== this.confirmPassword) {
      this.passwordsError = 'Passwords must match!';
    } else {
      this.passwordsError = '';

      this.user.oldPassword = this.user.password;
      this.user.password = this.newPassword;
      axios
        .post(
          environment.apiURL + 'africanscity/updateuserpassword',
          this.user,
          {
            headers: {
              Authorization: this.myLocalStorage.getItem('authHeaderString')!,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {
          if (response.data !== '') {
            this.passwordsError = response.data;
          } else {
            this.myLocalStorage.clear();
            this.router.navigateByUrl('/profile');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
