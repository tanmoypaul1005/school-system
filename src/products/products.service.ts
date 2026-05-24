import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createProductDto: any) {
        return this.prisma.product.create({
            data: createProductDto,
        });
    }
}
