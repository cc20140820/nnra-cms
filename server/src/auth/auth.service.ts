import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // TODO: 在真正的应用程序中，您不会以纯文本形式存储密码。取而代之的是使用带有加密单向哈希算法的 bcrypt 之类的库。
  // 使用这种方法，您只需存储散列密码，然后将存储的密码与 输入 密码的散列版本进行比较，这样就不会以纯文本的形式存储或暴露用户密码。
  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
