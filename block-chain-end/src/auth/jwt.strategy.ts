import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

console.log(`jwt:process.env.JWT_SECRET: ${process.env.JWT_SECRET}`); // 打印 JWT 密钥
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取 Token
      ignoreExpiration: false, // 是否忽略过期
      secretOrKey: process.env.JWT_SECRET, // 读取密钥
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOneByUsername(payload.username);
    if (!user) {
      throw new UnauthorizedException('Token 无效或用户不存在');
    }
    return user; // 返回用户信息
  }
}