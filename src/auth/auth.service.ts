import { RegisterDto } from './type';
import { UserService } from './../user/user.service';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Could not find a user with this email');
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.firstName + ' ' + user.lastName,
    };

    return await this.jwtService.signAsync(payload);
  }

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName } = registerDto;
    const user = await this.userService.findOne(email);

    if (user) {
      throw new HttpException('Email is already taken', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await this.userService.create(email, hashPassword, firstName, lastName);

    return await this.login(email, password);
  }
}
