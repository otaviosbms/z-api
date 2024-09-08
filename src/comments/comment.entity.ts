import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Publication } from '../publications/publication.entity';


@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'userId', type: 'int' })
  userId: number;

  @Column({ name: 'postId', type: 'int' })
  postId: number;

  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Publication, publication => publication.comments, { onDelete: 'CASCADE' })
  publication: Publication;
}