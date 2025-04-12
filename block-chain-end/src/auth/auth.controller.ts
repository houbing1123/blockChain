import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './DTO/loginUser.dto';
import Response from '../shared/responses/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    if (!username) {
      return Response.fail('用户名不能为空');
    }
    if (!password) {
      return Response.fail('密码不能为空');
    }
    const user = await this.authService.validateUser(loginUserDto.username, loginUserDto.password);
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() loginUserDto: LoginUserDto) { 
    return this.authService.register(loginUserDto);
   }
}