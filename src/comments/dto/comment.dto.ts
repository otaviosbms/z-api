import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  userId: number;

  @IsInt()
  publicationId: number;
}

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  content?: string;
}
