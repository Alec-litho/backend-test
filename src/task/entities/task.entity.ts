import { ApiProperty } from '@nestjs/swagger';
import { Role, Status } from '@prisma/client';

export class Task {
  @ApiProperty({ description: 'task identifier', nullable: false, example: 1 })
  id: string;
  @ApiProperty({ description: 'task name', nullable: false, example: 'bug in User module' })
  name: string;
  @ApiProperty({ description: 'task description', nullable: true, example: 'User module has bug when importing Prisma module' })
  description: string;
  @ApiProperty({ description: "task's deadline", nullable: false, example: '2025-03-02T11:33:50.592Z' })
  deadline: string;
  @ApiProperty({ description: 'project which contains this task', nullable: false, example: 1 })
  projectId: string;
  @ApiProperty({ description: "task's status", nullable: false, example: Status })
  status: Status;
  @ApiProperty({ description: 'users responsible for this task', example: [1, 2] })
  responsibleUsers: string[];
}
