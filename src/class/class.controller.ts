import { Controller, Get } from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @Get('')
    async getAllClasses() {
        return this.classService.getAllClasses();
    }
}
