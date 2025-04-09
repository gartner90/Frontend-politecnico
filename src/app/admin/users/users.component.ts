import {
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { AuthService } from '../../services/auth/auth.service';
import { RolEnum, StatusEnum } from '../../shared/enums';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUser } from '../../shared/interfaces';

@Component({
  selector: 'app-users',
  imports: [TableComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  @ViewChild('editBtn') public editBtn!: ElementRef<HTMLButtonElement>;

  @ViewChild('closeBtn') public closeBtn!: ElementRef<HTMLButtonElement>;

  private readonly destroyRef = inject(DestroyRef);

  private readonly formBuilder = inject(NonNullableFormBuilder);

  private readonly authService = inject(AuthService);

  private readonly userService = inject(UserService);
  // Definición de las columnas de la tabla de usuarios.
  protected columns = [
    { field: 'id', label: 'ID' },
    { field: 'email', label: 'Email' },
    { field: 'name', label: 'Full Name' },
    { field: 'rol', label: 'Role' },
    { field: 'status', label: 'Status' },
  ];
  // Array donde se almacenan los usuarios obtenidos del servicio.
  protected users: IUser[] = [];
  // Computed property que obtiene información del usuario autenticado.
  protected readonly user = computed(() => {
    const user = this.authService.userFromToken();
    return { email: user?.email, rol: user?.rol };
  });

  protected readonly rolOptions = computed(() => Object.values(RolEnum));

  protected readonly statusOptions = computed(() => Object.values(StatusEnum));

  protected readonly isEditing = signal(false);

  protected readonly isLoading = signal(false);

  protected readonly form;

  private prevUserData?: IUser & { id: number };

  constructor() {
    // Definición del formulario reactivo con validaciones para cada campo.
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: [RolEnum.USER, Validators.required],
      status: [StatusEnum.ACTIVE, Validators.required],
    });
  }
  // Llama a la función list para cargar los usuarios cuando el componente se inicializa.
  public ngOnInit(): void {
    this.list();
  }
  // Escucha el evento de apertura de un modal (Bootstrap).
  @HostListener('show.bs.modal', ['$event'])
  public onModalShow(event: Event) {
    const button = (event as any).relatedTarget;
    const value = button.getAttribute('data-bs-is-editing');
    this.isEditing.set(value === '1');
  }
  // Escucha el evento de cierre del modal (Bootstrap).
  @HostListener('hidden.bs.modal')
  public onModalHidden() {
    this.form.reset();
    this.prevUserData = undefined;
  }
  // Obtiene la lista de usuarios desde el servicio.
  private list() {
    this.isLoading.set(true);
    this.userService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.users = [...response];
          this.isLoading.set(false);
        },
      });
  }
  // Función para guardar un nuevo usuario.
  protected async save() {
    this.isLoading.set(true);
    const form = this.form.getRawValue();

    const isUnique = await this.authService.isUniqueEmail(form.email);
    if (!isUnique) {
      this.form.controls.email.setErrors({ invalid: true });
      this.isLoading.set(false);
      alert('Ya hay un usuario con este email');
      return;
    }
    // Crea el nuevo usuario.
    this.userService
      .create({ ...form })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          setTimeout(() => {
            this.closeBtn.nativeElement.click();
            this.list();
          }, 10);
        },
      });
  }
  // Función para editar un usuario existente.
  protected async edit() {
    if (!this.prevUserData) return;
    this.isLoading.set(true);
    const form = this.form.getRawValue();

    const isUnique = await this.authService.isUniqueEmail(form.email);
    if (!isUnique && form.email !== this.prevUserData.email) {
      this.form.controls.email.setErrors({ invalid: true });
      this.isLoading.set(false);
      alert('Ya hay un usuario con este email');
      return;
    }

    await this.userService.update(form, this.prevUserData.id - 1);
    this.isLoading.set(false);

    setTimeout(() => {
      this.closeBtn.nativeElement.click();
      this.list();
    }, 10);
  }
  // Maneja la acción de editar un usuario, cargando sus datos en el formulario.
  protected handleEdit(user: any) {
    this.prevUserData = user;
    this.form.patchValue(user);
    this.editBtn.nativeElement.click();
  }
  // Maneja la acción de eliminar un usuario.
  protected handleDelete(user: any) {
    this.isLoading.set(true);
    this.userService
      .delete(user.id - 1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.list();
        },
      });
  }
}
