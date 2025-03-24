import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import Response from 'src/shared/responses/response';
import {CreateUserDto} from '../users/DTO/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user; // 去除密码字段
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    if(user){
      return Response.success({
        access_token: this.jwtService.sign(payload),
      });
    }else{
      return Response.unauthorized({});
    }
  }
  async register(user: any) { // 注册
    const { username, password,email } = user;
    const userExist = await this.usersService.findOneByUsername(username);
    if (userExist) {
      return Response.fail('用户名已存在');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const User:CreateUserDto = { username, password: hashPassword,email }
    const newUser = await this.usersService.create(User);
    return Response.success(newUser);
  }
}