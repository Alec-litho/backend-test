import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Status } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    let currDate = new Date();
    const deadline = createTaskDto.deadline ? createTaskDto.deadline : currDate.setDate(currDate.getDate() + 1); //by default, deadline is 24 hours
    let taskToUpload: Prisma.TaskCreateInput = {
      name: createTaskDto.name,
      description: createTaskDto.description,
      status: Status.inProgress,
      project: { connect: { id: createTaskDto.project } },
      deadline: new Date(deadline).toISOString(),
    };
    const task = await this.prisma.task.create({ data: taskToUpload });
    await this.prisma.taskToUser.create({ data: { taskId: task.id, userId: createTaskDto.creator } });
    return task;
  }
  async findAll() {
    let result = await this.prisma.task.findMany();
    if (!result) throw new HttpException("tasks don't exists", HttpStatus.NOT_FOUND);
    return result;
  }

  async changeStatus(status: Status, taskId: number) {
    let result = await this.prisma.task.update({ where: { id: taskId }, data: { status } });
    if (!result) throw new HttpException("task don't exists", HttpStatus.NOT_FOUND);
    return result;
  }
  async setDeadline(deadline: string, taskId: number) {
    let result = await this.prisma.task.update({ where: { id: taskId }, data: { deadline } });
    if (!result) throw new HttpException("task don't exists", HttpStatus.NOT_FOUND);
    return result;
  }
  async changeProject(projectId: number, taskId: number) {
    let result = await this.prisma.task.update({ where: { id: taskId }, data: { projectId } });
    if (!result) throw new HttpException("task don't exists", HttpStatus.NOT_FOUND);
    return result;
  }
  async addResponsibleUser(responsibleUserId: number, taskId: number) {
    let result = await this.prisma.taskToUser.create({ data: { taskId, userId: responsibleUserId } });
    return result;
  }
  async remove(taskId: number) {
    const removedRelationship = await this.prisma.taskToUser.deleteMany({ where: { taskId } });

    const removedTask = await this.prisma.task.delete({ where: { id: taskId } });
    return { removedRelationship, removedTask, description: 'deleted rows' };
  }
}
