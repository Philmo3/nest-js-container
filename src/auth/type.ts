import { IsEmail } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;

  password: string;
}

export class RegisterDto extends LoginDTO {
  firstName: string;
  lastName: string;
}
