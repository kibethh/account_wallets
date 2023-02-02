import { IsString, IsEmail, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;
  @IsDefined()
  @IsString()
  password: string;
}
