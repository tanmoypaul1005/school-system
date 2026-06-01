import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
    
    constructor(private readonly prisma: PrismaService) {}

    async getAllCourses() {
        return this.prisma.course.findMany();
    }

    async createCourse(dto: CreateCourseDto) {
        return this.prisma.course.create({
            data: dto,
        });
    }
}
