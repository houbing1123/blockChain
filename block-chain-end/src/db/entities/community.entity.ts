import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Community {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    tags: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}