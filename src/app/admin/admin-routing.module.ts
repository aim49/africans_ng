import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { FeedbackadminComponent } from './feedbackadmin/feedbackadmin.component';
import { PackagesComponent } from './packages/packages.component';
import { PropertiesComponent } from './properties/properties.component';
import { PackagesEditComponent } from './packages.edit/packages.edit.component';

const routes: Routes = [
  { path: 'adminlayout', component: AdminlayoutComponent },
  { path: 'allUsers', component: AllUsersComponent },
  { path: 'createUser', component: CreateuserComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'feedback-admin', component: FeedbackadminComponent },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'createPackages', component: PackagesComponent },
  { path: 'packagesform', component: PackagesEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
