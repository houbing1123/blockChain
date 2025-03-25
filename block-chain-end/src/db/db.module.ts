import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; // 引入实体
import { Learning } from './entities/learning.entity'; // 引入实体

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/block-chain',
      entities: [User,Learning], // 添加其他实体
      synchronize: true, // 自动同步数据库结构（开发环境使用）
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class DatabaseModule {}