import { Component, OnInit } from '@angular/core';
import { MyLocalStorage } from '../myLocalStorage';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  authenticated: boolean = false;

  constructor(private myLocalStorage: MyLocalStorage) {}

  ngOnInit(): void {
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }
}
