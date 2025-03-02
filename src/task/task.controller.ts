import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Role, Status } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { ChangeStatusDto } from './dto/change-status.dto';
import { SetDeadlineDto } from './dto/set-deadline.dto';
import { DeletedTaskResponseDto } from './dto/deleted-task.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @ApiBearerAuth()
  @Roles([Role.ADMIN])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task created',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Some fields are not provided',
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }
  @ApiBearerAuth()
  @Roles([Role.ADMIN, Role.USER])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'change task status' })
  @ApiBody({ type: ChangeStatusDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status changed',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @Patch('/status/:taskId')
  changeStatus(@Param('taskId') id: number, @Body() body: { status: Status }) {
    return this.taskService.changeStatus(body.status, id);
  }
  @ApiBearerAuth()
  @Roles([Role.ADMIN])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'add responsible user to the task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Responsible user added',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @Patch(':taskId/user/:userId')
  addResponsibleUser(@Param('userId') userId: number, @Param('taskId') taskId: string) {
    return this.taskService.addResponsibleUser(+userId, +taskId);
  }
  @ApiBearerAuth()
  @Roles([Role.ADMIN, Role.USER])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'set deadline of the task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deadline is set',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @Patch(':taskId/deadline')
  setDeadline(@Param('taskId') id: number, @Body() body: SetDeadlineDto) {
    return this.taskService.setDeadline(body.deadline, +id);
  }
  @ApiBearerAuth()
  @Roles([Role.ADMIN, Role.USER])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'change board of the task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Board is changed',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @Patch(':taskId/project/:projectId')
  changeProject(@Param('taskId') id: string, @Param('projectId') projectId: string) {
    return this.taskService.changeProject(+projectId, +id);
  }
  @ApiBearerAuth()
  @Roles([Role.ADMIN])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task successfully deleted',
    type: DeletedTaskResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @Delete(':taskId')
  remove(@Param('taskId') id: string) {
    return this.taskService.remove(+id);
  }
}
