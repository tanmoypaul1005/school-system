import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseAssignDto } from './dto/create-course-assign.dto';
import { UpdateCourseAssignDto } from './dto/update-course-assign.dto';

@Injectable()
export class CourseAssignService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllAssignments() {
		return this.prisma.courseAssign.findMany({
			include: {
				course: true,
				section: true,
				classSlot: true,
				teacher: true,
			},
		});
	}

	async createAssignment(dto: CreateCourseAssignDto) {
		const { courseId, sectionId, classSlotId, teacherId, startDate, endDate, isActive } = dto;

        const exisitingClass= await this.prisma.findFirst({
            where:{
                sectionId: sectionId,
            }
        })

        const exsitingTeacher=await this.prisma.courseAssign.findFirst({
            where:{
                teacherId: teacherId,
            }
        })

        if(exsitingTeacher && exsitingTeacher.teacherId === teacherId){
            throw new Error('This teacher is already assigned to another class. Please choose a different teacher or section.');
        }

        if(exisitingClass.classSlotId === classSlotId){
            throw new Error('This class slot is already assigned to another section. Please choose a different class slot or section.');
        }

        if(exisitingClass.courseId === courseId){
            throw new Error('This course is already assigned to another section. Please choose a different course or section.');
        }

        
		return this.prisma.courseAssign.create({
			data: {
				courseId,
				sectionId: sectionId ?? null,
				classSlotId: classSlotId ?? null,
				teacherId,
				startDate: startDate ? new Date(startDate) : undefined,
				endDate: endDate ? new Date(endDate) : undefined,
				isActive: isActive ?? true,
			},
		});
	}

	async updateAssignment(id: string, dto: UpdateCourseAssignDto) {
		return this.prisma.courseAssign.update({
			where: { id },
			data: {
				...dto,
				startDate: dto.startDate ? new Date(dto.startDate) : undefined,
				endDate: dto.endDate ? new Date(dto.endDate) : undefined,
			},
		});
	}
}
