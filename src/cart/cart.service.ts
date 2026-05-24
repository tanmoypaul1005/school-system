import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
    constructor(private readonly prisma:PrismaClient) {}

    async createCart(createCartDto: CreateCartDto) {

        const product=await this.prisma.product.findFirst({
            where:{
                id:createCartDto.productId,
            }
        });

        return this.prisma.cart.create({
            data: createCartDto,
        });
    }

    
}
