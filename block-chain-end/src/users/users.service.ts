import { Injectable } from '@nestjs/common';
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
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }
  async updateUser(id: number, updateUserDto: Partial<CreateUserDto>): Promise<User|null> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }


}
