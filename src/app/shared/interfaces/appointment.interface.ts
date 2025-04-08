import { CategoryEnum } from '../enums';

export interface IAppointment {
  dateCreated: string;
  category: CategoryEnum;
  patient: string;
  doctor: string;
}
