import { Module, Post } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './publications/publications.module';
import { FollowersModule } from './followers/followers.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/user.entity';
import { Like } from './likes/like.entity';
import { Follower } from './followers/follower.entity';
import { Post } from './publications/publication.entity';
import { Comment } from './comments/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'z',
      entities: [Comment, Follower, Like, Post, User, ],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    FollowersModule,
    LikesModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
