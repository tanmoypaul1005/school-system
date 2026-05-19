import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllCourses() {
        return this.prisma.course.findMany({
            include: {
                section: true,
            },
        });
    }
}
