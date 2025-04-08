import { Routes } from '@angular/router';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { NewAppointmentComponent } from './views/admin/new-appointment/new-appointment.component';
import { EditAppointmentComponent } from './views/admin/edit-appointment/edit-appointment.component';
import { UsersComponent } from './views/admin/users/users.component'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
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
  }
];
