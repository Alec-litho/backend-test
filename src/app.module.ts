import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [PrismaModule, UsersModule, ConfigModule.forRoot(), AuthModule, TaskModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
