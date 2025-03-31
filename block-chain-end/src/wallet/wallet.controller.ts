import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletDto } from './DTO/wallet.dto';

@Controller('wallet')
export class WalletController {
    
    constructor(private readonly walletService: WalletService) {}

    @Post('create')
    async createEncryptedWallet(@Body() walletDto: WalletDto) { 
        console.log(`walletDto:`);
        console.dir(walletDto);
        return this.walletService.createEncryptedWallet(walletDto.id,walletDto.password);
    }
}
