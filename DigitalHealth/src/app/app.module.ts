import { LoginService } from './services/login.service';
import { SseService } from './services/sse.service';
import { KiService } from './services/ki.service';
import { MailService } from './services/mail.service';
import { PaypalService } from './services/paypal.service';
import { AccountService } from './services/account.service';
import { VideoServiceService } from './services/video-service.service';
import { UserServiceService } from './services/user-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { DataFormComponent } from './shared/data-form/data-form.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PricingComponent } from './shared/pricing/pricing.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AdminComponent } from './shared/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminPageComponent } from './admin-page/admin-page/admin-page.component';
import { NextVideosComponent } from './shared/next-videos/next-videos.component';
import { AgbsComponent } from './shared/agbs/agbs.component';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { PayPalConfirmationComponent } from './shared/pricing/paypal-confimation';
import { KiPageComponent } from './ki-page/ki-page.component';
import { SseHandlerService } from './services/sse-handler.service';
import { VideoEndedDialogComponent } from './shared/video-ended-dialog/video-ended-dialog.component';
import { SettingspageComponent } from './settingspage/settingspage.component';
import { CalenderComponent } from './shared/calender/calender.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FaqComponent } from './faq/faq.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { AgbPageComponent } from './agb-page/agb-page.component';

@NgModule({
  declarations: [
    PayPalConfirmationComponent,
    AppComponent,
    NavBarComponent,
    DataFormComponent,
    ProfilePageComponent,
    LandingPageComponent,
    PricingComponent,
    FooterComponent,
    RegisterPageComponent,
    AdminComponent,
    AdminPageComponent,
    NextVideosComponent,
    AgbsComponent,
    KiPageComponent,
    VideoEndedDialogComponent,
    SettingspageComponent,
    CalenderComponent,
    FaqComponent,
    DatenschutzComponent,
    AgbPageComponent,
  ],
  imports: [
    NgxJsonLdModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    A11yModule,
    ClipboardModule,
    MDBBootstrapModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    MailService,
    UserServiceService,
    VideoServiceService,
    AccountService,
    PaypalService,
    KiService,
    SseService,
    SseHandlerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
