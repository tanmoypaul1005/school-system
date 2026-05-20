import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World! This is a NestJS application with Prisma ORM.';
  }

  getUsers() {
    return this.prisma.user.findMany();
  }
}
