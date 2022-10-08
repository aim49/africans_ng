import { AfterViewInit, Component } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'africanscity';

  ngAfterViewInit(): void {
    $('#myDiv').text('jQuery is working');
  }

}
