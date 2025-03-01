import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Status } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { ChangeStatusDto } from './dto/change-status.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

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
  setDeadline(@Param('id') id: number, @Body() body: { deadline: string }) {
    return this.taskService.setDeadline(body.deadline, id);
  }
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
  changeProject(@Param('id') id: string, @Param('projectId') projectId: string) {
    return this.taskService.changeProject(+projectId, +id);
  }
  @ApiOperation({ summary: 'delete task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task successfully deleted',
    type: Task,
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
