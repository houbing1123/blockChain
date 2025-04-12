// src/wallet/wallet.service.ts
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import Response from '../shared/responses/response';
import { Wallet } from '../db/entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}
  // @Transaction()
  async createEncryptedWallet(id:number,password: string) {
    // 1. 生成钱包
    const wallet = ethers.Wallet.createRandom();
    const encryptedData = await wallet.encrypt(password);
    console.dir(wallet);
    console.log(wallet.privateKey)
  
    // 3. 返回非敏感数据 + 加密包
    return Response.success({
      wallet,
      encryptedData, // 加密后的数据包
      derivationPath: wallet.path ?? "m/44'/60'/0'/0/0"
    })
  }

  async getBalance(address: string) { 
    // 连接到以太坊节点（可以连接到本地节点或Infura等服务）
    const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/7963eb5ee08f4387a9d5ecabd222c0db'); // 你可以使用 Infura 或 Alchemy 等提供商
    console.dir(provider);
    const balance = await provider.getBalance(address);
    console.dir(balance);
    // 获取余额  
    const formattedBalance = ethers.formatEther(balance);
    console.dir(balance);

    // 返回余额
    return Response.success({formattedBalance});
  }
}