export class CreateUserDto {
  username: string;
  email?: string;
  password: string;
  avatar?: string; 
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateUserDto extends CreateUserDto {
  id: string;
}