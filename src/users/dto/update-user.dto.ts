import { PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from '../../auth/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDTO) {}
