import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Follower {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.following, { nullable: false })
  follower: User;

  @ManyToOne(() => User, user => user.followers, { nullable: false })
  followee: User;
}
