import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletDto } from './DTO/wallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wallet')
export class WalletController {
    
    constructor(private readonly walletService: WalletService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createEncryptedWallet(@Body() walletDto: WalletDto) { 
        console.log(`walletDto:`);
        console.dir(walletDto);
        return this.walletService.createEncryptedWallet(walletDto.id,walletDto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Post('getBalance')
    async getBalance(@Body() data: {address:string}) {
        console.log(`address:`);
        console.dir(data);
        return this.walletService.getBalance(data.address);
    }
}
