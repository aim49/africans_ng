import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { globalvars } from '../global-vars';
import { MyLocalStorage } from '../myLocalStorage';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  authenticated: boolean = false;
  currentUrl: string = '/';
  message: string = '';
  feedback: any = {
    id: 0,
    message: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {},
  };
  feedbackErrors: any = {
    id: 0,
    message: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {},
    __proto__: globalvars.errorsInitAndReset,
  };

  constructor(
    private router: Router,
    private myLocalStorage: MyLocalStorage,
    private notificatinService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.myLocalStorage.getItem('authenticated') === '1') {
      this.authenticated = true;
    } else {
      this.authenticated = false;
      this.router.navigateByUrl('/login?returnUrl=' + this.router.url);
    }
    this.feedbackErrors.init();
  }

  saveFeedback(): void {
    this.feedbackErrors.reset();
    axios
      .post(environment.apiURL + 'africanscity/savefeedback', this.feedback, {
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
        error.response.data.errors.forEach(
          (err: { field: any; defaultMessage: any }) => {
            this.feedbackErrors[err.field] =
              this.feedbackErrors[err.field] + err.defaultMessage + '; ';
          }
        );
        this.notificatinService.error(this.feedbackErrors);
      });
  }
}
