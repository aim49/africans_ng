import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { globalvars } from '../global-vars';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  user: any = { name: '', surname: '', email: '', password: '' };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  signUpUser(): void {
    axios
      .post(environment.apiURL + 'africanscity/saveuser', this.user, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
