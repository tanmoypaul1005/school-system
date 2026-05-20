import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World! 999 8888  000';
  }

  getUsers() {
    return this.prisma.user.findMany();
  }
}
