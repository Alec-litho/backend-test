import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'BuildNow' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @ApiProperty({ example: 'platform for automation of construction estimates' })
  description: string;
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  creatorId: number;
}
