type Wallet = {
  address: string
  privateKey: string
  mnemonic: string|undefined|null
}

interface WalletResponse extends LocalReponse {
  data: Wallet
}

interface WalletBalanceResponse extends LocalReponse {
  data: {
    formattedBalance: string
  }
}