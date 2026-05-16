import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(private readonly prisma:PrismaService) {}

    async createUser(payload: CreateUserDto) {
        const passwordHash = await bcrypt.hash(payload.password, 10);

        return this.prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: passwordHash,
                role: payload.role,
            },
        });
    }
}
