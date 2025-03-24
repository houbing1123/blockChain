import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Learning {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;
    
    @Column()
    description: string;
    
    @Column()
    content: string;
    
    @Column()
    type: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}