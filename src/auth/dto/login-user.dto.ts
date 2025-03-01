import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
}
