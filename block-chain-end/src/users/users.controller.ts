import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from './DTO/user.dto';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
    @Post('create')
    async create( @Body() creatUserDto: CreateUserDto) {
        return this.usersService.create(creatUserDto);
    }
}
