import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('class')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @Get('')
    async getAllClasses() {
        return this.classService.getAllClasses();
    }

    @Post('')
    async createClass(@Body() dto: CreateClassDto) {
        return this.classService.createClass(dto);
    }
}
