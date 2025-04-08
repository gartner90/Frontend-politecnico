import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { SimulateHttpService } from '../simulate-http/simulate-http.service';
import { IUser } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly simulateHttpService = inject(SimulateHttpService);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  public readonly userFromToken = signal<IUser | undefined>(undefined);

  constructor() {
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);
    if(!token) return;
    const user = localStorage.getItem('auth_user');
    if(!user) {
      this.logout();
      return;
    }
    this.userFromToken.set(JSON.parse(user) as IUser);
  }

  login(token: string): void {
    localStorage.setItem('auth_token', token);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.isAuthenticatedSubject.next(false);
    this.userFromToken.set(undefined);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }

  register(form: Record<string, any>) {
    return this.simulateHttpService.post('/users', form);
  }

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

  async isUniqueEmail(email: string) {
    const data = await firstValueFrom(this.simulateHttpService.get('/users'));
    const index = data.findIndex((user: any) => user.email === email);
    return index < 0;
  }
}
