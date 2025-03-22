import { Controller, Post, Body, Put } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.register(username, password);
  }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.login(username, password);
  }

  @Put('update')
  async updatePassword(@Body('username') username: string, @Body('newPassword') newPassword: string) {
    return this.authService.updatePassword(username, newPassword);
  }
}