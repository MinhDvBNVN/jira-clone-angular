import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {IssueEntity} from './issue.entity';
import {In, Repository} from 'typeorm';
import {UserEntity} from "../entity/user.entity";

@Injectable()
export class IssueService {
    constructor(@InjectRepository(IssueEntity) private issueRepository: Repository<IssueEntity>,
                @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
    }

    async createIssue(payload: IssueEntity) {
        return this.issueRepository.save(payload);
    }
    async updateIssue(id: number, payload: IssueEntity) {
        payload.updatedAt = new Date();
        payload.users = await this.convertUserIdToUserEntity(payload.userIds);
        payload = await this.issueRepository.save(payload);
        payload.userIds = this.convertUserEntityToUserId(payload.users);
        return payload;
    }

    async deleteIssue(id: number) {
        return await this.issueRepository.delete(id);
    }

    convertUserEntityToUserId(userEntity: UserEntity[]) {
        return userEntity.map((user: UserEntity) => {
            return user.id;
        })
    }

    async convertUserIdToUserEntity(users: number[]): Promise<UserEntity[]> {
        return this.userRepository.findBy({
            id: In([users])
        })
    }
}
