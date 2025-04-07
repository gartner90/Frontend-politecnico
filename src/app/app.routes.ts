import { UsersComponent } from './admin/users/users.component';
import { Routes } from '@angular/router';
import { AppointmentsComponent } from './admin/appointments/appointments.component';
import { NewAppointmentComponent } from './views/admin/new-appointment/new-appointment.component';
import { EditAppointmentComponent } from './views/admin/edit-appointment/edit-appointment.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './admin/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'appointments',
    component: AppointmentsComponent
  },
  {
    path: 'new-appointment',
    component: NewAppointmentComponent
  },
  {
    path: 'edit-appointment',
    component: EditAppointmentComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
];
