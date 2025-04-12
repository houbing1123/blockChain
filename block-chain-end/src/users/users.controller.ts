import { Body, Controller, Get, Post, UseGuards, Put, UseInterceptors, Param, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() creatUserDto: CreateUserDto) {
        return this.usersService.create(creatUserDto);
    }


    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async delete(@Body() id: number) {
        return this.usersService.deleteUser(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('findAll')
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        console.log(id);
        return this.usersService.findOneById(id);
    }

    // 更新头像接口
    @UseGuards(JwtAuthGuard)
    @Put(':id/avatar')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './assets/avatar',  // 保存路径
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${req.params.id}-${uniqueSuffix}${ext}`);  // 文件名：userId-时间戳.jpg
            }
        }),
        limits: { fileSize: 1024 * 1024 }, // 文件大小限制：1MB
    }))
    async updateAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new Error('没有上传头像');
        }
        const avatarUrl = `/assets/avatar/${file.filename}`; // 返回文件的 URL 地址
        // 调用 usersService 更新头像
        return await this.usersService.updateUserAvatar(id, avatarUrl);
    }

}
