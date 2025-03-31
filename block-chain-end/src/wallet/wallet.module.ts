import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '../db/entities/wallet.entity';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    controllers: [WalletController],
    providers: [WalletService],
})
export class WalletModule {}
