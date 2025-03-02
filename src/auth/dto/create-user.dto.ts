import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'Alec' })
  name: string;
  @ApiProperty({ example: '123' })
  password: string;
}
