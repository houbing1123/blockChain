import { Body, Controller, Get, Post,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto,UpdateUserDto} from './DTO/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
    @Post('create')
    async create( @Body() creatUserDto: CreateUserDto) {
        return this.usersService.create(creatUserDto);
    }
    
    @Post('update')
    async update( @Body() updateUserDto: UpdateUserDto) {
        let id:number = updateUserDto.id;
        if(typeof updateUserDto.id !== 'number'){
            id = parseInt(updateUserDto.id);
        }
        return this.usersService.updateUser(id, updateUserDto);
    }
    @Post('delete')
    async delete( @Body() id: number) {
        return this.usersService.deleteUser(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('findAll')
    async findAll() {
        return this.usersService.findAll();
    }
    
}
