import { Injectable } from '@angular/core';
import { MenuItem } from '../../shared/interfaces/menuItem';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly AUTH_MENU: MenuItem[] = [
    { label: 'Inicio', route: 'home', icon: '' },
    { label: 'Usuarios', route: 'users', icon: '' },
    { label: 'Citas', route: 'appointments', icon: '' },
    { label: 'Perfil', route: 'profile', icon: '' },
    { label: 'Cerrar sesión', route: '', icon: 'logout' }
  ];
  
  private readonly GUEST_MENU: MenuItem[] = [
    { label: 'Inicio', route: 'home', icon: '' },
    { label: 'Registrarse', route: 'register', icon: '' },
    { label: 'Iniciar sesión', route: 'login', icon: '' },
    { label: 'Contacto', route: 'contact', icon: '' }
  ];

  constructor(private readonly authService: AuthService) {}

  getMenu(): MenuItem[] { 
    return this.authService.isLoggedIn() ? this.AUTH_MENU : this.GUEST_MENU;
  }
}
