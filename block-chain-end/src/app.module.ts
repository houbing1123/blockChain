import { config } from 'dotenv';
config(); // 加载环境变量

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './db/db.module';
import { WalletModule } from './wallet/wallet.module';


@Module({
  imports: [
    DatabaseModule,
    AuthModule, 
    UsersModule, 
    WalletModule, 
   
  ]
})
export class AppModule {}
