import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type User = { id: number; username: string; password: string };

@Injectable()
export class AuthService {
  private users:User[] = []; // 临时存储用户数据，实际项目应使用数据库

  constructor(private jwtService: JwtService) {}

  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user:User = { id: Date.now(), username, password: hashedPassword };
    this.users.push(user);
    return { message: 'User registered successfully' };
  }

  async login(username: string, password: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user) return { message: 'User not found' };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { message: 'Invalid credentials' };

    const token = this.jwtService.sign({ userId: user.id, username: user.username });
    return { access_token: token };
  }

  async updatePassword(username: string, newPassword: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user) return { message: 'User not found' };

    user.password = await bcrypt.hash(newPassword, 10);
    return { message: 'Password updated successfully' };
  }
}