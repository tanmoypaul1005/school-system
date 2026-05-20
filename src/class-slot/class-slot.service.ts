import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassSlotService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllClassSlots() {
        return this.prisma.classSlot.findMany({
            include: {
                class: true,
                section: true,
                teacher: true,
            },
        });
    }
}
