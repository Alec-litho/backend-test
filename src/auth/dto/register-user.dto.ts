import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
