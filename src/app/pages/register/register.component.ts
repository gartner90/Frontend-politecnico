import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { RolEnum, RoutesEnum, StatusEnum } from '../../shared/enums';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  // Inyecciones de dependencias para el manejo del formulario, autenticación, y router
  private readonly destroyRef = inject(DestroyRef);

  private readonly router = inject(Router);

  private readonly formBuilder = inject(NonNullableFormBuilder);

  private readonly authService = inject(AuthService);

  protected readonly form;

  protected isLoading = signal(false);

  constructor() {
    // Inicializa el formulario con los campos necesarios y sus validaciones
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  // Método que se ejecuta cuando el usuario envía el formulario
  protected async onSubmit() {
    this.isLoading.set(true);
    const form = this.form.getRawValue();

    const isUnique = await this.authService.isUniqueEmail(form.email);
    if (!isUnique) {
      this.form.controls.email.setErrors({ invalid: true });
      this.isLoading.set(false);
      alert('Ya hay un usuario con este email');
      return;
    }
     // Si todo es válido, realiza el registro del usuario
    this.authService
      .register({ ...form, rol: RolEnum.USER, status: StatusEnum.ACTIVE })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate([RoutesEnum.LOGIN]);
        },
      });
  }
}
