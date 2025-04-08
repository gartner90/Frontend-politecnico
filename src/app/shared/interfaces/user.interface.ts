import { RolEnum } from '../enums';

export interface IUser {
  name: string;
  email: string;
  password: string;
  rol: RolEnum;
}
