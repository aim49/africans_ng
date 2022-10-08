import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MyLocalStorage } from 'src/app/myLocalStorage';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-feedbackadmin',
  templateUrl: './feedbackadmin.component.html',
  styleUrls: ['./feedbackadmin.component.css'],
})
export class FeedbackadminComponent implements OnInit {
  feedbacks: any = [];

  constructor(
    private myLocalStorage: MyLocalStorage,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getFeedbackAll();
  }

  getFeedbackAll(): void {
    axios
      .get(environment.apiURL + 'africanscity/getfeedbackall', {
        headers: {
          Authorization: this.myLocalStorage.getItem('authHeaderString')!,
        },
      })
      .then((response) => {
        this.feedbacks = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  convertDateToSlashesFormat(dateToConvert: string): string {
    return this.datepipe.transform(dateToConvert, 'dd/MM/yyyy')!;
  }
}
