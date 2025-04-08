import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  private readonly authService = inject(AuthService);

  private readonly profileService = inject(ProfileService);

  protected readonly form;

  protected isLoading = signal(false);

  constructor() {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
    });

    effect(() => {
      const user = this.authService.userFromToken();
      if (!user) return;
      this.form.patchValue(user);
    });
  }

  protected async onSubmit() {
    const authUser = this.authService.userFromToken();
    if (!authUser) throw new Error('No se encontro el usuario logueado');

    this.isLoading.set(true);
    const form = this.form.getRawValue();

    const isUnique = await this.authService.isUniqueEmail(form.email);
    if (!isUnique && form.email !== this.authService.userFromToken()?.email) {
      this.form.controls.email.setErrors({ invalid: true });
      this.isLoading.set(false);
      alert('Ya hay un usuario con este email');
      return;
    }

    const newData = { ...authUser, ...form };
    await this.profileService.updateUser(authUser.email, newData);
    this.isLoading.set(false);
  }
}
