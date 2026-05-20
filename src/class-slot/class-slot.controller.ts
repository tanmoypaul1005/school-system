import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ClassSlotService } from './class-slot.service';
import { CreateClassSlotDto } from './dto/create-class-slot.dto';
import { UpdateClassSlotDto } from './dto/update-class-slot.dto';

@Controller('class-slot')
export class ClassSlotController {

    constructor(private readonly classSlotService: ClassSlotService) {}

    @Get('')
    async getAllClassSlots() {
        return this.classSlotService.getAllClassSlots();
    }

    @Post('')
    async createClassSlot(@Body() dto: CreateClassSlotDto) {
        return this.classSlotService.createClassSlot(dto);
    }

    @Patch(':id')
    async updateClassSlot(@Param('id') id: string, @Body() dto: UpdateClassSlotDto) {
        return this.classSlotService.updateClassSlot(id, dto);
    }
}
