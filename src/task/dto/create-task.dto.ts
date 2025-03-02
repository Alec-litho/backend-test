import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'bug in User module' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'User module has bug when importing Prisma module' })
  @IsString()
  description: string;
  @ApiProperty({ example: '2025-03-02T11:33:50.592Z' })
  deadline?: string;
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  project: number;
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  creator: number;
}
