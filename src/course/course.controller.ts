import { Body, Controller, Get, Post } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')

export class CourseController {
    
    constructor(private readonly courseService: CourseService) {}

    @Get('')
    async getAllCourses() {
        return this.courseService.getAllCourses();
    }

    @Post('')
    async createCourse(@Body() dto: any) {
        return this.courseService.createCourse(dto);
    }
}
