import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassSlotDto } from './dto/create-class-slot.dto';
import { UpdateClassSlotDto } from './dto/update-class-slot.dto';

@Injectable()
export class ClassSlotService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllClassSlots() {
        return this.prisma.classSlot.findMany();
    }

    async createClassSlot(dto: CreateClassSlotDto) {
        return this.prisma.classSlot.create({
            data: {
                startTime: dto.startTime,
                endTime: dto.endTime,
            },
        });
    }

    async updateClassSlot(id: string, dto: UpdateClassSlotDto) {
        return this.prisma.classSlot.update({
            where: { id },
            data: {
                startTime: dto.startTime,
                endTime: dto.endTime,
            },
        });
    }
}
