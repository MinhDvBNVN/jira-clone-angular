import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProjectEntity} from "./project.entity";
import {Repository} from 'typeorm';
import {IssueEntity} from "../issue/issue.entity";

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(ProjectEntity) private projectRepository: Repository<ProjectEntity>) {
    }

    async getProjects() {
        const project = await this.projectRepository.find({
            relations: ['issues', 'issues.users', 'users', 'issues.comments', 'issues.comments.user']
        });
        project.forEach((p: ProjectEntity) => {
            p.issues.forEach((issue: IssueEntity) => {
                issue.userIds = issue.users.map((user: any) => {
                    return user.id;
                })
            })
        });
        return project[0];
    }

    async updateProject(id: number, payload: Partial<ProjectEntity>) {
        return this.projectRepository.update(id, payload);
    }
}
