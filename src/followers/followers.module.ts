import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { Follower } from './follower.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Follower])],
  providers: [FollowersService],
  controllers: [FollowersController],
  exports: [FollowersService]
})
export class FollowersModule {}
