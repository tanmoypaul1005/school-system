import { Controller, Get } from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
    constructor(private readonly sectionService: SectionService) {}

    @Get('')
    async getAllSections() {
        return this.sectionService.getAllSections();
    }
}
