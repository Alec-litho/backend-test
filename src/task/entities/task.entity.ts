import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class Task {
  @ApiProperty({ description: 'task identifier', nullable: false })
  id: string;
  @ApiProperty({ description: 'task name', nullable: false })
  name: string;
  @ApiProperty({ description: 'task description', nullable: true })
  description: string;
  @ApiProperty({ description: "task's deadline", nullable: false })
  deadline: string;
  @ApiProperty({ description: 'project which contains this task', nullable: false })
  projectId: string;
  @ApiProperty({ description: "task's status", nullable: false })
  status: Role;
  @ApiProperty({ description: 'users responsible for this task' })
  responsibleUsers: string[];
}
