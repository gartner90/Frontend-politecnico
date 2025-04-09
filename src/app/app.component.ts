import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RolEnum, StatusEnum } from './shared/enums';
import { IUser } from './shared/interfaces';
import { SimulateHttpService } from './services/simulate-http/simulate-http.service';
import { firstValueFrom } from 'rxjs';

// Define datos predeterminados de usuarios para simular la base de datos
const DEFAULT_DATA: IUser[] = [
  {
    name: 'Super Admin',
    email: 'admin@clinic.com',
    password: 'Password123',
    rol: RolEnum.ADMIN,
    status: StatusEnum.ACTIVE,
  },
  {
    name: 'John Doe',
    email: 'john.doe@clinic.com',
    password: 'Password123',
    rol: RolEnum.DOCTOR,
    status: StatusEnum.ACTIVE,
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@clinic.com',
    password: 'SecurePass456',
    rol: RolEnum.DOCTOR,
    status: StatusEnum.ACTIVE,
  },
  {
    name: 'Robert Johnson',
    email: 'robert.j@clinic.com',
    password: 'MedPass789',
    rol: RolEnum.DOCTOR,
    status: StatusEnum.ACTIVE,
  },
  {
    name: 'Maria García',
    email: 'maria.garcia@clinic.com',
    password: 'HealthCare2023',
    rol: RolEnum.DOCTOR,
    status: StatusEnum.ACTIVE,
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@clinic.com',
    password: 'DocSecure!123',
    rol: RolEnum.DOCTOR,
    status: StatusEnum.ACTIVE,
  },
  {
    name: 'Emily Wilson',
    email: 'emily.w@clinic.com',
    password: 'WilsonMed789',
    rol: RolEnum.DOCTOR,
    status: StatusEnum.ACTIVE,
  },
  {
    name: 'David Müller',
    email: 'david.mueller@clinic.com',
    password: 'DeutschPass123',
    rol: RolEnum.DOCTOR,
    status: StatusEnum.ACTIVE,
  },
  {
    name: 'Sofia Rossi',
    email: 'sofia.rossi@clinic.com',
    password: 'ItaliaMed456',
    rol: RolEnum.DOCTOR,
    status: StatusEnum.ACTIVE,
  },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly simulateHttpService = inject(SimulateHttpService);

  public ngOnInit(): void {
    this.validateDefaultData();
  }

  // Método privado para guardar los datos predeterminados en localStorage
  private validateDefaultData() {
    const defaultData = localStorage.getItem('/default-users');
    if (!defaultData || defaultData !== 'true') this.saveDefaultData();
  }

  // Método privado para guardar los datos predeterminados en localStorage
  private async saveDefaultData() {
    localStorage.setItem('/default-users', 'true');
    const data = await firstValueFrom(this.simulateHttpService.get('/users'));
    localStorage.setItem('/users', JSON.stringify([...DEFAULT_DATA, ...data]));
  }
}
