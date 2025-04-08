import { inject, Injectable } from '@angular/core';
import { SimulateHttpService } from '../simulate-http/simulate-http.service';
import { IUser } from '../../shared/interfaces';
import { firstValueFrom, map } from 'rxjs';
import { RolEnum, StatusEnum } from '../../shared/enums';

const DEFAULT_DATA: IUser[] = [
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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly simulateHttpService = inject(SimulateHttpService);

  constructor() {
    const defaultData = localStorage.getItem('/default-users');
    if (!defaultData) this.saveDefaultData();
  }

  private saveDefaultData() {
    localStorage.setItem('/default-users', JSON.stringify(DEFAULT_DATA));
  }

  create(form: IUser) {
    return this.simulateHttpService.post('/users', form);
  }

  async update(form: IUser, index: number) {
    const data = await firstValueFrom(this.simulateHttpService.get('/users'));
    if (index < 0) throw new Error('No se encontro el usuario');
    await firstValueFrom(this.delete(index));
    await firstValueFrom(
      this.simulateHttpService.post('/users', { ...data[index], ...form })
    );
  }

  list() {
    return this.simulateHttpService
      .get('/users')
      .pipe(
        map((users: IUser[]) =>
          [...DEFAULT_DATA, ...users].map((user, index) => ({
            ...user,
            id: index + 1,
          }))
        )
      );
  }

  delete(index: number) {
    return this.simulateHttpService.delete('/users', index);
  }
}
