import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { DashboardTopComponent } from './dashboard-top/dashboard-top.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CreateuserComponent } from './createuser/createuser.component';
import { PropertiesComponent } from './properties/properties.component';
import { FeedbackadminComponent } from './feedbackadmin/feedbackadmin.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { PackagesComponent } from './packages/packages.component';
import { PackagesEditComponent } from './packages.edit/packages.edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminlayoutComponent,
    AdminNavigationComponent,
    AllUsersComponent,
    DashboardTopComponent,
    CreateuserComponent,
    PropertiesComponent,
    FeedbackadminComponent,
    EnquiryComponent,
    AnnouncementsComponent,
    PackagesComponent,
    PackagesEditComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class AdminModule {}
