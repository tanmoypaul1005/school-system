import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';

@Module({
  providers: [SectionService],
  controllers: [SectionController]
})
export class SectionModule {}
