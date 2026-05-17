import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SectionService {

    constructor(private readonly prisma: PrismaService) {}

    async getAllSections() {
        return this.prisma.section.findMany({
            include: {
                class: true,
                students: true,
            },
        });
    }
}
