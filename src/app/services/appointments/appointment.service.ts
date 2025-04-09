import { inject, Injectable } from '@angular/core';
import { SimulateHttpService } from '../simulate-http/simulate-http.service';
import { firstValueFrom, map } from 'rxjs';
import { IAppointment } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  // Inyecta el servicio para simular las solicitudes HTTP
  private readonly simulateHttpService = inject(SimulateHttpService);
  // Método para crear una nueva cita
  create(form: IAppointment) {
    return this.simulateHttpService.post('/appointments', form);
  }
  // Método para actualizar una cita existente
  async update(form: IAppointment, index: number) {
    const data = await firstValueFrom(
      this.simulateHttpService.get('/appointments')
    );
    if (index < 0) throw new Error('No se encontro la cita');
    await firstValueFrom(this.delete(index));
    await firstValueFrom(
      this.simulateHttpService.post('/appointments', {
        ...data[index],
        ...form,
      })
    );
  }
  // Método para listar todas las citas
  list() {
    return this.simulateHttpService.get('/appointments').pipe(
      map((appointments: IAppointment[]) =>
        appointments.map((appointment, index) => ({
          ...appointment,
          id: index + 1,
        }))
      )
    );
  }
  // Método para eliminar una cita existente
  delete(index: number) {
    return this.simulateHttpService.delete('/appointments', index);
  }
}
