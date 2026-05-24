import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentAssignService {

    constructor(private readonly prisma:PrismaService) { }

    async assignStudentToCourse(studentId: number, courseId: number) {
        // Check if the student exists
        const student = await this.prisma.student.findUnique({
            where: { id: studentId },
        });
        if (!student) {
            throw new Error('Student not found');
        }
    }
}
