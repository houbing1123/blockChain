import { Injectable } from '@nestjs/common';
import {ObjectId} from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';
import { CreateUserDto } from './DTO/user.dto';
import Response from '../shared/responses/response';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    console.dir(createUserDto);
    const user = this.userRepository.create(createUserDto);
    console.log("user");
    console.dir(user);
    return this.userRepository.save(user);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateUser(id: string, updateUserDto: Partial<CreateUserDto>): Promise<Response> {
    const objectId = new ObjectId(id); // 或其他转换方式
    const user = await this.userRepository.manager.transaction(async manager => {
      await manager.update(User, objectId, updateUserDto);
      return manager.findOne(User, { where: { _id: objectId } }); // 确保查询使用相同类型
  });
    return Response.success(user); // 确保这里返回的是解析后的user，不是Promise
  }
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOneById(id: string): Promise<User | null> {
    const objectId = new ObjectId(id.toString()); // 或其他转换方式
    const user = await this.userRepository.findOne({ where: { _id: objectId } });
    console.dir(user);
    
    return user
  }
  async updateUserAvatar(id: string, avatar: string): Promise<Response | null> {
    // 更新用户的头像路径
    const user = await this.updateUser(id, { avatar });
    console.log("avatar");
    console.dir(user);

    // 返回更新后的用户信息
    return user;
  }


}
