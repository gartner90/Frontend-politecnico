import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/components/table/table.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-users',
  imports: [TableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private readonly authService = inject(AuthService);

  columns = [
    { field: 'id', label: 'ID' },
    { field: 'email', label: 'Email' },
    { field: 'fullName', label: 'Full Name' },
    { field: 'role', label: 'Role' },
    { field: 'status', label: 'Status' }
  ];

  users = [
    { id: 1, email: 'nmiranda@mail.com', fullName: 'Nicolás Miranda', role: 'Admin', status: 'Active' },
    { id: 2, email: 'mgomez@mail.com', fullName: 'Maria Gomez', role: 'Paciente', status: 'Inactive' },
    { id: 3, email: 'jlopez@mail.com', fullName: 'Juan Lopez', role: 'Medico', status: 'Active' },
    { id: 4, email: 'lrodriguez@mail.com', fullName: 'Laura Rodriguez', role: 'Admin', status: 'Active' },
    { id: 5, email: 'ccastro@mail.com', fullName: 'Carlos Castro', role: 'Paciente', status: 'Inactive' },
    { id: 6, email: 'andrea@mail.com', fullName: 'Andrea Ruiz', role: 'Medico', status: 'Active' },
    { id: 7, email: 'jtorres@mail.com', fullName: 'Javier Torres', role: 'Paciente', status: 'Active' },
    { id: 8, email: 'vgarcia@mail.com', fullName: 'Valeria Garcia', role: 'Admin', status: 'Inactive' },
    { id: 9, email: 'pedro@mail.com', fullName: 'Pedro Ramirez', role: 'Medico', status: 'Active' },
    { id: 10, email: 'sofia@mail.com', fullName: 'Sofia Morales', role: 'Paciente', status: 'Inactive' }
  ];

  protected readonly user = computed(() => {
    const user = this.authService.userFromToken();
    return { email: user?.email, rol: user?.rol }
  });

  constructor(private readonly router: Router){}

  handleNew(){
    console.log('New user:');
  }
  
  handleEdit(user: any) {
    console.log('Edit user:', user);
  }

  handleDelete(user: any) {
    console.log('Delete user:', user);
  }

}
