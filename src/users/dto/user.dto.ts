import { IsString, IsEmail, IsOptional, Length,  } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 255)
  username: string;

  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(8, 255)
  password_hash: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  location?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  website?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  username?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 255)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(8, 255)
  password_hash?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  location?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  website?: string;
}
