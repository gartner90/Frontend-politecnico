import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { SimulateHttpService } from '../simulate-http/simulate-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly simulateHttpService = inject(SimulateHttpService);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);
  }

  login(token: string): void {
    localStorage.setItem('auth_token', token);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isAuthenticatedSubject.next(false);
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
    return email === user.email && password === user.password;
  }

  async isUniqueEmail(email: string) {
    const data = await firstValueFrom(this.simulateHttpService.get('/users'));
    const index = data.findIndex((user: any) => user.email === email);
    return index < 0;
  }
}
