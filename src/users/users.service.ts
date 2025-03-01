import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  findAll() {
    return this.prisma.user.findMany();
  }

  update(id: number, updateUserDto: UpdateUserDto) {}

  remove(id: number) {}
}
