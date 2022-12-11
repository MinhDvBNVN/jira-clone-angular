import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entity/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class AppService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
  }
  getHello(): string {
    const result = this.userRepository.find();
    return `This is a simple API for Angular Jira Clone app. For more info, visit https://github.com/trungk18/jira-clone-angular ${JSON.stringify(result)}`;
  }
}
