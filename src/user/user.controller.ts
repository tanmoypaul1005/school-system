import { Body, Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async createUser(@Body() body: { name: string, email: string }) {
        const { name, email } = body;
        return this.userService.createUser(name, email);
    }
}
