import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Project } from './entities/project.entity';
import { DeletedProjectResponseDto } from './dto/deleted-project.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth()
  @Roles([Role.ADMIN])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth()
  @Roles([Role.ADMIN])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth()
  @Roles([Role.ADMIN])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth()
  @Roles([Role.ADMIN])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth()
  @Roles([Role.ADMIN])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete project' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Project deleted',
    type: DeletedProjectResponseDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
