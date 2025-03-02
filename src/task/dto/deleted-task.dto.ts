import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';

export class DeletedTaskResponseDto {
  @ApiProperty({ example: { count: 1 } })
  removedRelationship: { count: number };
  @ApiProperty({ type: Task })
  removedTask: Task;
  @ApiProperty()
  description: string;
}
