import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Project } from './entities/project.entity';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'create project' })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Project created',
    type: Project,
  })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }
  @ApiOperation({ summary: 'add developer to the project' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Developer added',
    type: Project,
  })
  @Patch('/:projectId/developer/:id')
  addDeveloper(@Param('id') userId: string, @Param('projectId') projectId: string) {
    return this.projectService.addDeveloper(+userId, +projectId);
  }
  @ApiOperation({ summary: 'remove developer from the project' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Developer removed',
    type: Project,
  })
  @Delete('/:projectId/developer/:id')
  removeDeveloper(@Param('id') userId: string, @Param('projectId') projectId: string) {
    return this.projectService.removeDeveloper(+userId, +projectId);
  }
  @ApiOperation({ summary: 'update parameters of project' })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Project updated',
    type: Project,
  })
  @Put(':projectId')
  update(@Body() UpdateProjectDto: UpdateProjectDto, @Param('id') projectId: string) {
    return this.projectService.update(+projectId, UpdateProjectDto);
  }
  @ApiOperation({ summary: 'delete project' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Project deleted',
    type: Boolean,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
