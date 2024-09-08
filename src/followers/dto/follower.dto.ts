import { IsInt } from 'class-validator';

export class CreateFollowerDto {
  @IsInt()
  followerId: number;

  @IsInt()
  followeeId: number;
}
