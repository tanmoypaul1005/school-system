import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassService {
    constructor(private readonly prisma:PrismaService) {}

    async getAllClasses() {
        return this.prisma.class.findMany({
        
        });
    }

}
