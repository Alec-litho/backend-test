import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    const isCreated = await this.prisma.project.findFirst({ where: { name: createProjectDto.name } });
    if (isCreated) throw new HttpException('project with same name already exists', HttpStatus.BAD_REQUEST);
    const result = await this.prisma.project.create({ data: createProjectDto });
    await this.prisma.projectToUser.create({ data: { projectId: result.id, userId: createProjectDto.creatorId } });
    return result;
  }

  async addDeveloper(userId: number, projectId: number) {
    return await this.prisma.projectToUser.create({ data: { projectId, userId } });
  }

  async removeDeveloper(userId: number, projectId: number) {
    return await this.prisma.projectToUser.delete({ where: { projectId_userId: { userId, projectId } } });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.prisma.project.update({ where: { id }, data: updateProjectDto });
  }

  async remove(projectId: number) {
    const removedRelationship = await this.prisma.projectToUser.deleteMany({ where: { projectId } });

    const removedProject = await this.prisma.project.delete({ where: { id: projectId } });

    return { removedRelationship, removedProject, description: 'deleted rows' };
  }
}
