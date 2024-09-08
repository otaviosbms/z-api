import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { Like } from '../likes/like.entity';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @ManyToOne(() => User, user => user.publications)
  user: User;

  @OneToMany(() => Comment, comment => comment.publication)
  comments: Comment[];

  @OneToMany(() => Like, like => like.publication)
  likes: Like[];
}
