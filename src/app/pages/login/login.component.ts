import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 
  
  email: string = '';
  password: string = '';
  error: string | null = null;

  constructor(
    private readonly authService: AuthService, 
    private readonly router: Router
  ) {}

  onLogin(): void {
    const loggedIn = this.validateLogin(this.email, this.password);
    if (loggedIn) {
      this.authService.login("fakeToken");
      this.router.navigate(['home']);
    } else {
      this.error = 'Correo o contraseña inválidos';
    }
  }

  validateLogin(email: string, password: string){
    return (email && password);
  }
  

}
