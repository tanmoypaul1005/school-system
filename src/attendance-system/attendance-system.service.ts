import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceSystemService {
    constructor(private readonly prisma:PrismaService) {}
}
