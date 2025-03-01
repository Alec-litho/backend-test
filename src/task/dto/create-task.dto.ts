import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  deadline?: string;
  @ApiProperty()
  @IsNotEmpty()
  projectId: number;
}
