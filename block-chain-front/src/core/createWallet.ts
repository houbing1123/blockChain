import { ethers } from 'ethers'
// import {createWallet} from '../services/wallet'


export class EthereumWallet {
  private provider?: ethers.BrowserProvider
  private signer?: ethers.JsonRpcSigner
  public address?: string
  public localAddress?: string

  // 连接浏览器扩展钱包(如MetaMask)
  async connectBrowserWallet() {
    if (!window.ethereum) throw new Error('未检测到以太坊钱包扩展')
    
    this.provider = new ethers.BrowserProvider(window.ethereum)
    this.signer = await this.provider.getSigner()
    this.address = await this.signer.getAddress()
    
    return this.address
  }

  // 创建新钱包(不推荐前端直接生成私钥，仅演示用)
  static async createRandomWallet ():Promise<any> {
    // const wallet = await createWallet('admin')
    const wallet = ethers.Wallet.createRandom()
    console.log(wallet);
    const mnemonic = wallet.mnemonic?.phrase;
    const privateKey = wallet.privateKey
    return {
      address: wallet.address,
      mnemonic,
      privateKey
    }
  }

  // 获取余额
  async getBalance(address?: string) {
    if (!this.provider) throw new Error('未连接钱包')
    return this.provider.getBalance(address ?? this.address!)
  }

  // 发送ETH
  async sendETH(to: string, amount: string) {
    if (!this.signer) throw new Error('未连接钱包')
    
    const tx = await this.signer.sendTransaction({
      to,
      value: ethers.parseEther(amount)
    })
    
    return tx.hash
  }
}