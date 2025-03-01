import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @ApiProperty()
  creatorId: number;
}
