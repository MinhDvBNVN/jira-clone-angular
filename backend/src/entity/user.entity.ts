import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProjectEntity} from "../project/project.entity";
import {CommentEntity} from "./comment.entity";

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
        name: 'created_at',
        type: 'datetime'
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'datetime'
    })
    updatedAt: Date;

    @ManyToOne(() => ProjectEntity, (projectEntity) => projectEntity.users)
    project: ProjectEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];

}
