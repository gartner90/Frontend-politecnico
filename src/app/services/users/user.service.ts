import { inject, Injectable } from '@angular/core';
import { SimulateHttpService } from '../simulate-http/simulate-http.service';
import { IUser } from '../../shared/interfaces';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly simulateHttpService = inject(SimulateHttpService);

  // Método para crear un nuevo usuario, simula un POST utilizando SimulateHttpService
  create(form: IUser) {
    return this.simulateHttpService.post('/users', form);
  }
  // Método para actualizar un usuario, simula un PUT (actualización) de un usuario
  async update(form: IUser, index: number) {
    const data = await firstValueFrom(this.simulateHttpService.get('/users'));
    if (index < 0) throw new Error('No se encontro el usuario');
    await firstValueFrom(this.delete(index));
    await firstValueFrom(
      this.simulateHttpService.post('/users', { ...data[index], ...form })
    );
  }
  // Método para obtener la lista de usuarios, combinando los usuarios predeterminados y los obtenidos
  list() {
    return this.simulateHttpService.get('/users').pipe(
      map((users: IUser[]) =>
        users.map((user, index) => ({
          ...user,
          id: index + 1,
        }))
      )
    );
  }
  // Método para eliminar un usuario, simula un DELETE
  delete(index: number) {
    return this.simulateHttpService.delete('/users', index);
  }
}
