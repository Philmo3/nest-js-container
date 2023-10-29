import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAll() {
    return this.userRepository.find({ take: 10 });
  }

  findOne(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async create(
    email: string,
    hashPassword: string,
    firstName: string,
    lastName: string,
  ) {
    return this.userRepository.save({
      email,
      password: hashPassword,
      firstName,
      lastName,
    });
  }
}
