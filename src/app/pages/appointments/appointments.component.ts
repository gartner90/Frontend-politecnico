import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TableComponent } from '../../shared/components/table/table.component';
import { AuthService } from '../../services/auth/auth.service';
import { CategoryEnum, RolEnum } from '../../shared/enums';
import { IAppointment } from '../../shared/interfaces';
import { AppointmentService } from '../../services/appointments/appointment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../services/users/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-appointments',
  imports: [TableComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  standalone: true,
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('editBtn') public editBtn!: ElementRef<HTMLButtonElement>;

  @ViewChild('closeBtn') public closeBtn!: ElementRef<HTMLButtonElement>;

  // Dependencias inyectadas en el constructor

  private readonly destroyRef = inject(DestroyRef);

  private readonly formBuilder = inject(NonNullableFormBuilder);

  private readonly authService = inject(AuthService);

  private readonly appointmentService = inject(AppointmentService);

  private readonly userService = inject(UserService);
  // Definición de columnas de la tabla
  protected columns = [
    { field: 'id', label: 'ID' },
    { field: 'dateCreated', label: 'Fecha' },
    { field: 'category', label: 'Categoría' },
    { field: 'patient', label: 'Paciente' },
    { field: 'doctor', label: 'Doctor' },
  ];
  // Inicialización de variables de estado
  protected appointments: IAppointment[] = [];

  protected doctors: string[] = [];
  // Computed para obtener la información del usuario desde el AuthService
  protected readonly user = computed(() => {
    const user = this.authService.userFromToken();
    return { email: user?.email, rol: user?.rol };
  });

  protected readonly categoryOptions = computed(() =>
    Object.values(CategoryEnum)
  );

  protected readonly canCreate = signal(false);

  protected readonly canEdit = signal(false);

  protected readonly canDelete = signal(false);

  protected readonly isEditing = signal(false);

  protected readonly isLoading = signal(false);

  protected readonly form;

  private prevAppointmentData?: IAppointment & { id: number };

  constructor() {
    // Creación del formulario con controles y validaciones
    this.form = this.formBuilder.group({
      dateCreated: [this.getCurrentDateTime(), Validators.required],
      category: [CategoryEnum.GENERAL, Validators.required],
      patient: ['', Validators.required],
      doctor: ['', Validators.required],
    });
    // Efecto que se ejecuta cada vez que se cambia la información del usuario
    effect(() => {
      const user = this.authService.userFromToken();
      if (!user) return;
      this.form.controls.patient.setValue(user.name);
      this.canCreate.set(user.rol !== RolEnum.DOCTOR);
      this.canEdit.set(user.rol === RolEnum.ADMIN);
      this.canDelete.set(user.rol !== RolEnum.DOCTOR);
    });
  }

  public ngOnInit(): void {
    this.list();
  }

  @HostListener('show.bs.modal', ['$event'])
  public onModalShow(event: Event) {
    const button = (event as any).relatedTarget;
    const value = button.getAttribute('data-bs-is-editing');
    this.isEditing.set(value === '1');
  }
  // Manejo de eventos de Bootstrap para mostrar/ocultar el modal
  @HostListener('hidden.bs.modal')
  public onModalHidden() {
    const user = this.authService.userFromToken();
    this.form.reset();
    this.form.controls.patient.setValue(user!.name);
    this.prevAppointmentData = undefined;
  }
  // Método para obtener la fecha y hora actual en el formato adecuado para un input 'datetime-local'
  private getCurrentDateTime(): string {
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - tzOffset).toISOString().slice(0, 16);
  }
  // Método para cargar la lista de citas y usuarios
  private list() {
    this.isLoading.set(true);
    forkJoin({
      appointments: this.appointmentService.list(),
      users: this.userService.list(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ appointments, users }) => {
          const user = this.authService.userFromToken();
          const getAppointments = () => {
            if (user?.rol === RolEnum.ADMIN) return [...appointments];
            if (user?.rol === RolEnum.USER)
              return [...appointments].filter(
                (appointment) =>
                  appointment.patient.toLowerCase() === user.name.toLowerCase()
              );
            return [...appointments].filter(
              (appointment) =>
                appointment.doctor.toLowerCase() === user?.name.toLowerCase()
            );
          };

          this.appointments = getAppointments();
          this.doctors = [...users]
            .filter((user) => user.rol === RolEnum.DOCTOR)
            .map((user) => user.name);
          this.isLoading.set(false);
        },
      });
  }
  // Método para guardar una nueva cita
  protected async save() {
    this.isLoading.set(true);
    const form = this.form.getRawValue();
    this.appointmentService
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
  // Método para editar una cita existente
  protected async edit() {
    if (!this.prevAppointmentData) return;
    this.isLoading.set(true);
    const form = this.form.getRawValue();

    await this.appointmentService.update(form, this.prevAppointmentData.id - 1);
    this.isLoading.set(false);

    setTimeout(() => {
      this.closeBtn.nativeElement.click();
      this.list();
    }, 10);
  }
  // Manejo del evento de edición de una cita (se carga la cita en el formulario)
  protected handleEdit(data: any) {
    this.prevAppointmentData = data;
    this.form.patchValue(data);
    this.editBtn.nativeElement.click();
  }
  // Manejo del evento de eliminación de una cita
  protected handleDelete(data: any) {
    this.isLoading.set(true);
    this.appointmentService
      .delete(data.id - 1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.list();
        },
      });
  }
}
