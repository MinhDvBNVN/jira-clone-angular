import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {IssueEntity} from "../issue/issue.entity";
import {UserEntity} from "../entity/user.entity";

@Entity({
    name: 'project'
})
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column({
        name: 'create_at',
        type: 'datetime'
    })
    createAt: Date;

    @Column({
        name: 'update_at',
        type: 'datetime'
    })
    updateAt: Date;

    @OneToMany(() => IssueEntity, (issueEntity) => issueEntity.project)
    issues: IssueEntity[];

    @OneToMany(() => UserEntity, (userEntity) => userEntity.project)
    users: UserEntity[];
}
