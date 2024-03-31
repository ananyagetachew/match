import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationFormComponent } from './pages/reservation-form/reservation-form.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ReservedTableDateComponent } from './pages/reserved-table-date/reserved-table-date.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reserved-table-date',
    component: ReservedTableDateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reservation-form', component: ReservationFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
