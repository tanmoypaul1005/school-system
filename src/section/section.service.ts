import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
@Injectable()
export class SectionService {

    constructor(private readonly prisma: PrismaService) {}

    async getAllSections() {
        return this.prisma.section.findMany({
            include: {
                class: true,
            },
        });
    }

    async createSection(dto: CreateSectionDto) {
        return this.prisma.section.create({
            data: dto,
        });
    }
}
