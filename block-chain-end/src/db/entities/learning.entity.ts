import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Learning {
    @ObjectIdColumn()
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