import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SimulateHttpService } from '../simulate-http/simulate-http.service';
import { IUser } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly simulateHttpService = inject(SimulateHttpService);
  // Inyecta el servicio para simular solicitudes HTTP
  async updateUser(prevEmail: string, form: IUser) {
    const data = await firstValueFrom(this.simulateHttpService.get('/users'));
    const index = data.findIndex((user: any) => user?.email === prevEmail);
    if (index < 0) throw new Error('No se encontro el usuario logueado');
    await firstValueFrom(this.simulateHttpService.delete('/users', index));
    await firstValueFrom(
      this.simulateHttpService.post('/users', { ...data[index], ...form })
    );
    // Actualiza los datos del usuario en el localStorage
    localStorage.setItem('auth_user', JSON.stringify(form));
    return true;
  }
}
