import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from "../entity/user.entity";
import {ProjectEntity} from "../project/project.entity";
import {Exclude} from "class-transformer";
import {CommentEntity} from "../entity/comment.entity";
@Entity({
    name: 'issue',
})
export class IssueEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'title',
        type: 'longtext'
    })
    title: string;

    @Column()
    type: string;

    @Column()
    status: string;

    @Column({
        name: 'list_position'
    })
    listPosition: number;

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

    @Column({
        name: 'reporter_id'
    })
    reporterId: number;

    @ManyToMany(() => UserEntity)
    @JoinTable({
        name: 'issue_user',
        joinColumn: {
            name: 'issue_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    users: UserEntity[];

    @Exclude()
    userIds: number[];

    @ManyToOne(() => ProjectEntity, (projectEntity) => projectEntity.issues)
    project: ProjectEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.issue, {
        cascade: ['insert', 'update', 'remove']
    })
    comments: CommentEntity[];
}
