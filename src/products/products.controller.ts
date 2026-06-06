import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')

export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll() {
        return 'This action returns all products';
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }
    
}
