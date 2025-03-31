import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';


console.log(`process.env.JWT_SECRET: ${process.env.JWT_SECRET}`); // 打印 JWT 密钥
@Module({
  imports: [
    UsersModule, // 导入用户模块
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // 替换为你的密钥
      signOptions: { expiresIn: '1h' }, // 设置 Token 过期时间
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}