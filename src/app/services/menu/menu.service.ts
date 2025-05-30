import { Injectable } from '@angular/core';
import { MenuItem } from '../../shared/interfaces/menuItem';
import { AuthService } from '../auth/auth.service';
import { RolEnum } from '../../shared/enums';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Menú para usuarios autenticados con permisos elevados
  private readonly AUTH_MENU: MenuItem[] = [
    { label: 'Inicio', route: 'home', icon: '' },
    { label: 'Usuarios', route: 'users', icon: '' },
    { label: 'Citas', route: 'appointments', icon: '' },
    { label: 'Perfil', route: 'profile', icon: '' },
    { label: 'Contacto', route: 'contact', icon: '' },
    { label: 'Cerrar sesión', route: '', icon: 'logout' }
  ];
  // Menú para usuarios invitados (no autenticados)
  private readonly GUEST_MENU: MenuItem[] = [
    { label: 'Inicio', route: 'home', icon: '' },
    { label: 'Registrarse', route: 'register', icon: '' },
    { label: 'Iniciar sesión', route: 'login', icon: '' },
    { label: 'Contacto', route: 'contact', icon: '' }
  ];
  // Menú para usuarios autenticados con rol de usuario estándar
  private readonly USER_MENU: MenuItem[] = [
    { label: 'Inicio', route: 'home', icon: '' },
    { label: 'Citas', route: 'appointments', icon: '' },
    { label: 'Perfil', route: 'profile', icon: '' },
    { label: 'Contacto', route: 'contact', icon: '' },
    { label: 'Cerrar sesión', route: '', icon: 'logout' }
  ];

  constructor(private readonly authService: AuthService) {}
  // Método para obtener el menú adecuado según el estado de autenticación y el rol del usuario
  getMenu(): MenuItem[] { 
    if(!this.authService.isLoggedIn()) return this.GUEST_MENU;
    const user = this.authService.userFromToken()!;
    return user.rol === RolEnum.USER ? this.USER_MENU : this.AUTH_MENU;
  }
}
