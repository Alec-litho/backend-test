import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'user identifier', nullable: false })
  'id': number;
  @ApiProperty({ description: 'user name', nullable: false })
  'name': string;
  @ApiProperty({
    description: 'user role',
    enum: ['USER', 'ADMIN'],
    nullable: false,
  })
  'role';
}
