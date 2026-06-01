import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CourseAssignService } from './course-assign.service';
import { CreateCourseAssignDto } from './dto/create-course-assign.dto';
import { UpdateCourseAssignDto } from './dto/update-course-assign.dto';

@Controller('course-assign')
export class CourseAssignController {
	
	constructor(private readonly courseAssignService: CourseAssignService) {}

	@Get('')
	async getAllAssignments() {
		return this.courseAssignService.getAllAssignments();
	}

	@Post('')
	async createAssignment(@Body() dto: CreateCourseAssignDto) {
		return this.courseAssignService.createAssignment(dto);
	}

	@Patch(':id')
	async updateAssignment(@Param('id') id: string, @Body() dto: UpdateCourseAssignDto) {
		return this.courseAssignService.updateAssignment(id, dto);
	}
}
