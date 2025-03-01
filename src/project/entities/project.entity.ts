import { ApiProperty } from '@nestjs/swagger';

export class Project {
  @ApiProperty({ description: 'project identifier', nullable: false })
  id: string;
  @ApiProperty({ description: 'project name', nullable: false })
  name: string;
  @ApiProperty({ description: 'project description', nullable: true })
  description: string;
  @ApiProperty({ description: 'creator of the project', nullable: false })
  creatorId: number;
  @ApiProperty({ description: 'project creation date', nullable: false })
  createdAt: string;
}
