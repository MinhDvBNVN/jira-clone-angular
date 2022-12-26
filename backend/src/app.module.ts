import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectModule} from "./project/project.module";
import {IssueModule} from "./issue/issue.module";
import {ProjectEntity} from "./project/project.entity";
import {IssueEntity} from "./issue/issue.entity";
import {UserEntity} from "./entity/user.entity";
import {CommentEntity} from "./entity/comment.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'demo-aws.ct1dx0zyt0qg.ap-southeast-1.rds.amazonaws.com',
          port: 3306,
          username: 'admin',
          password: '12345678',
          database: 'jira_clone',
          entities: [ProjectEntity, IssueEntity, UserEntity, CommentEntity],
          synchronize: true
      }),
      ProjectModule,
      IssueModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
