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

        if(!product){
            throw new Error('Product not found');
        }

        const existingCart=await this.prisma.cart.findFirst({
            where:{
                userId:createCartDto.userId,
                productId:createCartDto.productId,
                isActive:true,
            }
        });

        if(existingCart){

        }else{
        return this.prisma.cart.create({
            data: createCartDto,
        });
        }
    }
}
