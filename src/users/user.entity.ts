import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Publication } from '../publications/publication.entity';
import { Comment } from '../comments/comment.entity';
import { Follower } from '../followers/follower.entity';
import { Like } from '../likes/like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', type: 'varchar', unique: true })
  username: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'password', type: 'text' })
  password: string;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  name: string;

  @Column({ name: 'bio', type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'location', type: 'varchar', nullable: true })
  location: string;

  @Column({ name: 'website', type: 'varchar', nullable: true })
  website: string;

  @OneToMany(() => Publication, publication => publication.user)
  publications: Publication[];

  @OneToMany(() => Follower, follower => follower.follower)
  following: Follower[];

  @OneToMany(() => Follower, follower => follower.followee)
  followers: Follower[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
