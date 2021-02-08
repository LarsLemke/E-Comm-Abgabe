import { AgbPageComponent } from './agb-page/agb-page.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { FaqComponent } from './faq/faq.component';
import { SettingspageComponent } from './settingspage/settingspage.component';
import { KiPageComponent } from './ki-page/ki-page.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { AdminPageComponent } from './admin-page/admin-page/admin-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './shared/admin/admin.component';

const routes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: '', component: LandingPageComponent },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: ' payment/success', component: LandingPageComponent },
  { path: 'ki', component: KiPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'agbs', component: AgbPageComponent },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [LoginGuardGuard],
  },
  { path: 'admin', component: AdminComponent, canActivate: [LoginGuardGuard] },
  {
    path: 'settings',
    component: SettingspageComponent,
    canActivate: [LoginGuardGuard],
  },
  { path: '**', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
