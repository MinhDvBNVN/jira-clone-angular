import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectEntity} from "./project.entity";
import {ProjectController} from "./project.controller";
import {ProjectService} from "./project.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity])],
    controllers: [ProjectController],
    providers: [ProjectService]
})
// @ts-ignore
export class ProjectModule {
}
