import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from './like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Publication } from '../publications/publication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, User, Publication]),
  ],
  providers: [LikesService],
  controllers: [LikesController],
  exports: [LikesService]
})
export class LikesModule { }
