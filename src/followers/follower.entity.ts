import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique, Column } from 'typeorm';
import { User } from '../users/user.entity';


@Entity()
@Unique(["followerId", "followeeId"])
export class Follower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'followerId', type: 'int' })
  followerId: number;

  @Column({ name: 'followeeId', type: 'int' })
  followeeId: number;

  @ManyToOne(() => User, { nullable: false })
  follower: User;

  @ManyToOne(() => User, { nullable: false })
  followee: User;
}
