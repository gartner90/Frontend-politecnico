import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from '../../interfaces/menuItem';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  // Definimos una propiedad para almacenar el menú que será mostrado
  menu: MenuItem[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly menuService: MenuService,
    private readonly router: Router
  ) {}
  // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(() => {
      this.menu = this.menuService.getMenu();
    });
  }
  // Método que maneja el clic en un elemento del menú
  handleMenuClick(item: MenuItem): void {
    if (item.label === 'Cerrar sesión') {
      this.onLogout();
    } else {
      this.router.navigate([item.route]);
    }
  }
  // Método para cerrar sesión
  onLogout(): void {
    // Llamamos al método de logout del AuthService para eliminar la sesión
    this.authService.logout();
  }

}
