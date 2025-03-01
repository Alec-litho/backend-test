import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class ChangeStatusDto {
  @ApiProperty()
  status: Status;
}
