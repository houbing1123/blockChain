export class WalletDto {
    id: number;
    password: string;
}

export class CreateWalletDto {
    id: number;
    address: string;
    privateKey: string;
    mnemonic?: string|null;
}