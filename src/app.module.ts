import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { FollowersModule } from './followers/followers.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, PostsModule, FollowersModule, LikesModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
