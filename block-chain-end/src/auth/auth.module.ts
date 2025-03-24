import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule, // 导入用户模块
    JwtModule.register({
      secret: 'your-secret-key', // 替换为你的密钥
      signOptions: { expiresIn: '1h' }, // 设置 Token 过期时间
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}