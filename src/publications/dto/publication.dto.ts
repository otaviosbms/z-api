import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  userId: number;
}

export class UpdatePublicationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;

  @IsOptional()
  @IsInt()
  userId?: number;
}
