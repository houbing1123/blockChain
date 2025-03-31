// src/wallet/wallet.service.ts
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import Response from '../shared/responses/response';
import { Wallet } from '../db/entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './DTO/wallet.dto';
import { Transaction } from 'src/core/decorators/transaction.decorator';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}
  @Transaction()
  async createEncryptedWallet(id:number,password: string) {
    // 1. 生成钱包
    const wallet = ethers.Wallet.createRandom();
    const encryptedData = await wallet.encrypt(password);
    console.dir(wallet);
    console.log(wallet.privateKey)
    // const walletDto:CreateWalletDto = this.walletRepository.create({
    //   id,
    //   address: wallet.address,
    //   privateKey: wallet.privateKey,
    //   mnemonic: wallet.mnemonic?.phrase,
    // });
    // // 2. 保存钱包到数据库
    // await this.walletRepository.save(walletDto);

    
    // 2. 加密敏感数据
    // const encryptedData = await encryptWalletData(password);
    
    // 3. 返回非敏感数据 + 加密包
    return Response.success({
      wallet,
      encryptedData, // 加密后的数据包
      derivationPath: wallet.path ?? "m/44'/60'/0'/0/0"
    })
  }
}