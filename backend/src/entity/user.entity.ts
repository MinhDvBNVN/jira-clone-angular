import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
    name: 'user'
})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        name: 'avatar_url'
    })
    avatarUrl: string;

    @Column({
        name: 'created_at'
    })
    createdAt: Date;

    @Column({
        name: 'updated_at'
    })
    updatedAt: Date;
}
