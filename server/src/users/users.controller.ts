import { Controller, Get } from '@nestjs/common';
import { User } from './dto/user.dto';
import { Role } from 'src/roles/roles.enum';

@Controller('users')
export class UsersController {
  constructor() {}

  @Get('all')
  getAllUsers(): User[] {
    return [
      { id: '1', username: 'super-admin', roles: [Role.Admin] },
      { id: '2', username: 'common-user', roles: [Role.User] },
    ];
  }
}
