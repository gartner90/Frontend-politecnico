import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { SimulateHttpService } from '../simulate-http/simulate-http.service';
import { IUser } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   // Inyecta el servicio para simular solicitudes HTTP
  private readonly simulateHttpService = inject(SimulateHttpService);
  // Comportamiento observable que gestiona el estado de autenticación del usuario
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  public readonly userFromToken = signal<IUser | undefined>(undefined);

  constructor() {
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);
    // Si no hay token, no hay usuario autenticado
    if(!token) return;
    const user = localStorage.getItem('auth_user');
    if(!user) {
      this.logout();
      return;
    }
    this.userFromToken.set(JSON.parse(user) as IUser);
  }
  // Método para iniciar sesión
  login(token: string): void {
    localStorage.setItem('auth_token', token);
    this.isAuthenticatedSubject.next(true);
  }
  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.isAuthenticatedSubject.next(false);
    this.userFromToken.set(undefined);
  }
  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }
  // Método para registrar un nuevo usuario
  register(form: Record<string, any>) {
    return this.simulateHttpService.post('/users', form);
  }
  // Método para validar las credenciales del usuario al hacer login
  async validateUserForLogin(email: string, password: string) {
    const data = await firstValueFrom(this.simulateHttpService.get('/users'));
    const user = data.find((user: any) => user?.email === email);
    if(!user) return false;
    const areValidCredentials = email === user.email && password === user.password;
    if(!areValidCredentials) return false;
    this.userFromToken.set(user);
    localStorage.setItem('auth_user', JSON.stringify(user));
    return true;
  }
  // Método para verificar si un correo electrónico es único
  async isUniqueEmail(email: string) {
    const data = await firstValueFrom(this.simulateHttpService.get('/users'));
    const index = data.findIndex((user: any) => user.email === email);
    return index < 0;
  }
}
