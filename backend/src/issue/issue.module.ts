import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {IssueEntity} from "./issue.entity";
import {IssueController} from "./issue.controller";
import {IssueService} from "./issue.service";
import {UserEntity} from "../entity/user.entity";
import {CommentEntity} from "../entity/comment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([IssueEntity, UserEntity, CommentEntity])],
    controllers: [IssueController],
    providers: [IssueService]
})
export class IssueModule {
}
