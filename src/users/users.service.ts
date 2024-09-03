import { Injectable } from '@nestjs/common';
import UsersRepository from './users.repository';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getByEmail(email: string) {
    return this.usersRepository.getByEmail(email);
  }

  async getById(id: number) {
    return this.usersRepository.getById(id);
  }

  async create(user: CreateUserDto) {
    return this.usersRepository.create(user);
  }
}

export default UsersService;