import { Injectable } from '@angular/core';
import { catchError, delay, firstValueFrom, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulateHttpService {
  // Establece un retraso predeterminado para simular el tiempo de respuesta de una solicitud HTTP
  private readonly defaultDelay = 1000;
   // Método simulado GET para obtener datos de 'localStorage' a partir de la URL
  public get(url: string): Observable<any[]> {
    return of(null).pipe(
      delay(this.defaultDelay),
      map(() => {
        try {
          const storedData = localStorage.getItem(url);

          if (!storedData) return [];

          return JSON.parse(storedData);
        } catch (error) {
          console.error(error);
          throw new Error('Error parsing stored data');
        }
      }),
      catchError(error => throwError(() => new Error(error)))
    );
  }
  // Método simulado POST para agregar datos a 'localStorage' bajo la URL indicada
  public post(url: string, data: any) {
    return of(null).pipe(
      delay(this.defaultDelay),
      tap(async () => {
        try {
          const prevData = await firstValueFrom(this.get(url));
          localStorage.setItem(url, JSON.stringify([...prevData, data]));
        } catch (error) {
          console.error(error);
          throw new Error('Error saving data');
        }
      }),
      map(() => data),
      catchError(error => throwError(() => new Error(error)))
    );
  }
  // Método simulado DELETE para eliminar un elemento de 'localStorage' por índice
  public delete(url: string, index: number) {
    return of(null).pipe(
      delay(this.defaultDelay),
      tap(async () => {
        try {
          const prevData = await firstValueFrom(this.get(url));
          if (!prevData.length || index < 0) return;
          prevData.splice(index, 1);
          localStorage.setItem(url, JSON.stringify([...prevData]));
        } catch (error) {
          console.error(error);
          throw new Error('Error removing data');
        }
      }),
      map(() => ({ deleted: true })),
      catchError(error => throwError(() => new Error(error)))
    );
  }
}
