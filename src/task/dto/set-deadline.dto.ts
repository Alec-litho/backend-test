import { ApiProperty } from '@nestjs/swagger';

export class SetDeadlineDto {
  @ApiProperty({ example: '2025-03-02T11:33:50.592Z' })
  deadline: string;
}
