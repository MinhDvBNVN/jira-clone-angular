import {Body, Controller, Delete, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {IssueEntity} from './issue.entity';
import {IssueService} from './issue.service';

@Controller('issue')
export class IssueController {
    constructor(private issueService: IssueService) {
    }

    @Post()
    async createIssue(@Body() payload: IssueEntity) {
        return await this.issueService.createIssue(payload);
    }

    @Put(':id')
    async updateIssue(@Param('id', ParseIntPipe) id: number, @Body() payload: IssueEntity) {
        return this.issueService.updateIssue(id, payload);
    }

    @Delete(':id')
    async deleteIssue(@Param('id', ParseIntPipe) id: number) {
        return this.issueService.deleteIssue(id);
    }
}
