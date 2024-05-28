import { Role } from 'src/roles/roles.enum';

export class User {
  readonly id: string;
  readonly roles: Role[];
  readonly username: string;
}
