import { UserService } from './user.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUser() {
    return await this.userService.getAll();
  }
}
