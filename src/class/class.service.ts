import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassService {
    
    constructor(private readonly prisma:PrismaService) {}

    async getAllClasses() {
        return this.prisma.class.findMany({
        
        });
    }

    async createClass(dto:CreateClassDto) {
        return this.prisma.class.create({
            data: {
                name: dto.name,
                numericName: dto.numericName,
            },
        });
    }
}
