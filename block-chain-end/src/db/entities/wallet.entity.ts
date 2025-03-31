import { Column,Entity,ObjectIdColumn } from "typeorm";

@Entity()
export class Wallet {
    @ObjectIdColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    address: string;

    @Column()
    privateKey: string;

    @Column({nullable:true})
    mnemonic: string|undefined|null;
}

