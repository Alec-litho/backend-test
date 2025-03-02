import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../entities/project.entity';

export class DeletedProjectResponseDto {
  @ApiProperty({ example: { count: 1 } })
  removedRelationship: { count: number };
  @ApiProperty({ type: Project })
  removedProject: Project;
  @ApiProperty()
  description: string;
}
