import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateUserDTO } from '../auth/dto/create-user.dto';
import { LoginUserDTO } from '../auth/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUser: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    let registerUser: Prisma.UserCreateInput = {
      ...createUser,
      password: hashedPassword,
    };
    return await this.prisma.user.create({ data: registerUser });
  }

  async login(loginUserDTO: LoginUserDTO) {
    const user = await this.prisma.user.findFirst({ where: { name: loginUserDTO.name } });
    if (!user) throw new NotFoundException(`No user found for name: ${loginUserDTO.name}`);

    const isPasswordValid = await bcrypt.compare(loginUserDTO.password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async validateJwtUser(userId: number): Promise<{ id: number; role: Role }> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User not found`);
    return { id: user.id, role: user.role };
  }
}
