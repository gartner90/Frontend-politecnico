import { RolEnum, StatusEnum } from '../enums';

export interface IUser {
  name: string;
  email: string;
  password: string;
  rol: RolEnum;
  status: StatusEnum;
}
