import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IssueEntity} from "../issue/issue.entity";
import {UserEntity} from "./user.entity";

@Entity({
    name: 'comment'
})
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'body',
        type: 'longtext'
    })
    body: string;

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
        name: 'user_id'
    })
    userId: number;

    @Column({
        name: 'issue_id'
    })
    issueId: number;

    @ManyToOne(() => IssueEntity, (issue) => issue.comments)
    issue: IssueEntity;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    user: UserEntity;

}
