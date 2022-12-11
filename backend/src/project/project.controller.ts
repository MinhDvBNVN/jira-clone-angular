import { Controller, Get } from '@nestjs/common';
import { Project } from './projects';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entity/user.entity";
import {Repository} from "typeorm";

@Controller('project')
export class ProjectController {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
  }
  @Get()
  async getProject() {
    const result = await this.userRepository.find();
    console.log(JSON.stringify(result));
    return Project;
  }
}
