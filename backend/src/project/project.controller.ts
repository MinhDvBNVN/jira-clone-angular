import {Body, Controller, Get, Param, ParseIntPipe, Put} from '@nestjs/common';
import {ProjectService} from "./project.service";
import {ProjectEntity} from "./project.entity";

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async getProject() {
    return await this.projectService.getProjects();
  }

  @Put(':id')
  async updateProject(@Param('id', ParseIntPipe) id: number, @Body() payload: ProjectEntity) {
    return await  this.projectService.updateProject(id, payload);
  }
}
