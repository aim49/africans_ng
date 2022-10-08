import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { globalvars } from '../global-vars';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  propertiesCounts: any = [];

  constructor() {}

  ngOnInit(): void {
    axios
      .get(environment.apiURL + 'africanscity/getpropertiescounts', {})
      .then((response) => {
        this.propertiesCounts = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
