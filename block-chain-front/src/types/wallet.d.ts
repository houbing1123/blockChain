type Wallet = {
  address: string
  privateKey: string
  mnemonic: string|undefined|null
}

interface WalletResponse extends Response {
  data: Wallet
}