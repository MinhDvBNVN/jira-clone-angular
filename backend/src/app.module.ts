import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectController } from './project/project.controller';
import { AuthController } from './auth/auth.controller';
import {UserEntity} from "./entity/user.entity";
import {Repository} from "typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: '127.0.0.1',
          port: 3306,
          username: 'root',
          password: '123456',
          database: 'jira_clone',
          entities: [UserEntity],
          synchronize: true,
      }),
      TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AppController, ProjectController, AuthController],
  providers: [AppService],
})
export class AppModule {}
