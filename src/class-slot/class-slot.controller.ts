import { Controller, Get } from '@nestjs/common';

@Controller('class-slot')
export class ClassSlotController {

    @Get('')
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
