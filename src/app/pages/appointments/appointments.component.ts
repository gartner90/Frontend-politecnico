import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-appointments',
  imports: [],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsComponent { }
