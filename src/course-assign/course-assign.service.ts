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
