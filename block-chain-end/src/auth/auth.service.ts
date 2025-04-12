import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import Response from 'src/shared/responses/response';
import {CreateUserDto} from '../users/DTO/user.dto';
import { LoginUserDto } from './DTO/loginUser.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string|number): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const passwordStr = password.toString();
    if (user && await bcrypt.compare(passwordStr, user.password)) {
      const { password, ...result } = user; // 去除密码字段
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    console.dir(payload);

    if(user){
      return Response.success({
        access_token: this.jwtService.sign(payload),
        user
      });
    }else{
      return Response.unauthorized({});
    }
  }
  async register(user: LoginUserDto) { // 注册
    const { username, password, email } = user;
    if(!username){
      return Response.fail('用户名不能为空');
    }
    if(!password){
      return Response.fail('密码不能为空');
    }
    const userExist = await this.usersService.findOneByUsername(username);
    if (userExist) {
      return Response.fail('用户名已存在');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const User:CreateUserDto = { 
      username, 
      password: hashPassword,
      email,
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    const newUser = await this.usersService.create(User);
    return Response.success(newUser);
  }

  async test(){
    return Response.success({msg:'测试成功'});
  }
}