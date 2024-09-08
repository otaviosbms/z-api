import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';


@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'userId', type: 'int' })
  userId: number;

  @ManyToOne(() => User, user => user.publications)
  user: User;

  @OneToMany(() => Comment, comment => comment.publication, { onDelete: 'CASCADE' })
  comments: Comment[];

  @ManyToMany(() => User, user => user.likedPublications)
  @JoinTable({
    name: 'like',
    joinColumn: { name: 'publicationId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' }
  })
  likers: User[];
}
