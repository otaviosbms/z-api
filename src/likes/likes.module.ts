import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from './like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikesService],
  controllers: [LikesController],
  exports: [LikesService]
})
export class LikesModule {}
