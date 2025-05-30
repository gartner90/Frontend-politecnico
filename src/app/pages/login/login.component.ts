import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 
  // Propiedades para almacenar el correo electrónico, la contraseña y los errores
  email: string = '';
  password: string = '';
  error: string | null = null;

  protected isLoading = signal(false);

  constructor(
    private readonly authService: AuthService, 
    private readonly router: Router
  ) {}
  // Método que se ejecuta cuando el usuario intenta iniciar sesión
  async onLogin(): Promise<void> {
    this.isLoading.set(true);
    this.error = '';
    const loggedIn = await this.validateLogin(this.email, this.password);
    if (loggedIn) {
      this.authService.login("fakeToken");
      this.router.navigate(['home']);
    } else {
      this.error = 'Correo o contraseña inválidos';
    }
    this.isLoading.set(false);
  }
  // Método para validar las credenciales con el servicio de autenticación
  async validateLogin(email: string, password: string) {
    const isValid = await this.authService.validateUserForLogin(email, password);
    return isValid;
  }
}
