import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-appointments',
  imports: [TableComponent],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  standalone: true,
})
export class AppointmentsComponent {

  
  columns = [
    { field: 'id', label: 'ID' },
    { field: 'date', label: 'Fecha' },
    { field: 'category', label: 'Categoría' },
    { field: 'patient', label: 'Paciente' },
    { field: 'doctor', label: 'Doctor' }
  ];
  

  appointments = [
    { id: 1, date: '01 ABRIL 2025 - 08:00 AM', category: 'Medicina General', patient: 'Carlos Ruiz', doctor: 'Dr. Laura Gómez' },
    { id: 2, date: '01 ABRIL 2025 - 09:30 AM', category: 'Odontología', patient: 'Ana Torres', doctor: 'Dra. María Pérez' },
    { id: 3, date: '01 ABRIL 2025 - 10:15 AM', category: 'Pediatría', patient: 'Tomás Díaz', doctor: 'Dr. Julián Romero' },
    { id: 4, date: '01 ABRIL 2025 - 11:00 AM', category: 'Medicina General', patient: 'Lucía Vargas', doctor: 'Dr. Laura Gómez' },
    { id: 5, date: '01 ABRIL 2025 - 01:15 PM', category: 'Odontología', patient: 'Diego Mendoza', doctor: 'Dra. María Pérez' },
    { id: 6, date: '01 ABRIL 2025 - 02:00 PM', category: 'Pediatría', patient: 'Sofía Morales', doctor: 'Dr. Julián Romero' },
    { id: 7, date: '01 ABRIL 2025 - 02:45 PM', category: 'Medicina General', patient: 'Javier Orozco', doctor: 'Dr. Laura Gómez' },
    { id: 8, date: '01 ABRIL 2025 - 03:30 PM', category: 'Odontología', patient: 'Claudia Peña', doctor: 'Dra. María Pérez' },
    { id: 9, date: '01 ABRIL 2025 - 04:15 PM', category: 'Pediatría', patient: 'Valentina Ríos', doctor: 'Dr. Julián Romero' },
    { id: 10, date: '01 ABRIL 2025 - 05:00 PM', category: 'Medicina General', patient: 'Pedro Hernández', doctor: 'Dr. Laura Gómez' },
    { id: 11, date: '02 ABRIL 2025 - 08:00 AM', category: 'Odontología', patient: 'Camila Salazar', doctor: 'Dra. María Pérez' },
    { id: 12, date: '02 ABRIL 2025 - 09:15 AM', category: 'Pediatría', patient: 'Samuel Jiménez', doctor: 'Dr. Julián Romero' },
    { id: 13, date: '02 ABRIL 2025 - 10:45 AM', category: 'Medicina General', patient: 'Marta Castillo', doctor: 'Dr. Laura Gómez' },
    { id: 14, date: '02 ABRIL 2025 - 11:30 AM', category: 'Odontología', patient: 'Lucas Moreno', doctor: 'Dra. María Pérez' },
    { id: 15, date: '02 ABRIL 2025 - 01:00 PM', category: 'Pediatría', patient: 'Isabela León', doctor: 'Dr. Julián Romero' }
  ];
  

  constructor(private readonly router: Router){}

  handleNew(){
    console.log('New appointment:');
  }
  
  handleEdit(appointment: any) {
    console.log('Edit appointment:', appointment);
  }

  handleDelete(appointment: any) {
    console.log('Delete appointment:', appointment);
  }


}
