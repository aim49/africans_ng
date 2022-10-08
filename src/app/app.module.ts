import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CounterComponent } from './counter/counter.component';
import { CommentsComponent } from './comments/comments.component';
import { ListedListingsComponent } from './listed-listings/listed-listings.component';
import { FooterComponent } from './footer/footer.component';
import { OurProductsComponent } from './our-products/our-products.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { HeroComponent } from './hero/hero.component';
import { LandingComponent } from './landing/landing.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { WeDoComponent } from './we-do/we-do.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TitleInfoComponent } from './title-info/title-info.component';
import { PropertyRequestComponent } from './property-request/property-request.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { HomeAgentsComponent } from './home-agents/home-agents.component';
import { PropertiesCounterComponent } from './properties-counter/properties-counter.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { SinglePackageComponent } from './single-package/single-package.component';
import { AllListingsComponent } from './all-listings/all-listings.component';
import { UploadListingComponent } from './upload-listing/upload-listing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SingleListingComponent } from './single-listing/single-listing.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AllAgentsComponent } from './all-agents/all-agents.component';
import { AgentComponent } from './agent/agent.component';
import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { MakeRequestComponent } from './make-request/make-request.component';
import { SingleCompanyComponent } from './single-company/single-company.component';
// import { AdminRoutingModule } from './admin/admin-routing.module';
// start of modules datatable
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
// end of modules form datatable
import { DatePipe } from '@angular/common';
import { ConfrimPayComponent } from './confrim-pay/confrim-pay.component';
import { HelpViewComponent } from './help-view/help-view.component';
import { TermsconditionsComponent } from './termsconditions/termsconditions.component';
import { LandingViewComponent } from './landing-view/landing-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'myListings',
    component: MyPropertiesComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'propertyID',
    component: SingleListingComponent,
  },

  {
    path: 'favorite',
    component: FavouriteComponent,
  },
  {
    path: 'register',
    component: SignUpComponent,
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'singleCompany',
    component: SingleCompanyComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'Properties',
    component: AllListingsComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'contact',
    component: ContactUsComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  {
    path: 'single-package',
    component: SinglePackageComponent,
  },
  {
    path: 'upload-listing',
    component: UploadListingComponent,
  },
  {
    path: 'property',
    component: SingleListingComponent,
  },
  {
    path: 'favorite',
    component: FavouriteComponent,
  },
  {
    path: 'all-agents',
    component: AllAgentsComponent,
  },
  {
    path: 'agent-profile',
    component: AgentProfileComponent,
  },
  {
    path: 'all-agents',
    component: AllAgentsComponent,
  },
  {
    path: 'agent-profile',
    component: AgentProfileComponent,
  },

  {
    path: 'company-list',
    component: CompanyProfileComponent,
  },
  {
    path: 'request',
    component: MakeRequestComponent,
  },
  {
    path: 'comfirm-payment',
    component: ConfrimPayComponent,
  },
  {
    path: 'help',
    component: HelpViewComponent,
  },
  {
    path: 'terms',
    component: TermsconditionsComponent,
  },

  {
    path: 'index',
    component: LandingViewComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((opt) => opt.AdminModule),
  },
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CounterComponent,
    CommentsComponent,
    ListedListingsComponent,
    FooterComponent,
    OurProductsComponent,
    LoginComponent,
    SearchComponent,
    HeroComponent,
    LandingComponent,
    NewsletterComponent,
    WeDoComponent,
    TitleInfoComponent,
    PropertyRequestComponent,
    TestimonialsComponent,
    HomeAgentsComponent,
    PropertiesCounterComponent,
    AboutUsComponent,
    ContactUsComponent,
    HomeComponent,
    PricingComponent,
    SinglePackageComponent,
    AllListingsComponent,
    UploadListingComponent,
    SignUpComponent,
    ResetPasswordComponent,
    ProfileComponent,
    SettingsComponent,
    FeedbackComponent,
    SingleListingComponent,
    FavouriteComponent,
    MyPropertiesComponent,
    AccordionComponent,
    AllAgentsComponent,
    AgentComponent,
    AgentProfileComponent,
    CompanyProfileComponent,
    MakeRequestComponent,
    SingleCompanyComponent,
    ConfrimPayComponent,
    HelpViewComponent,
    TermsconditionsComponent,
    LandingViewComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CarouselModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    // AdminRoutingModule //is of as its not in use as am using lazy loading for the follwing components
  ],
  providers: [NotificationService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
