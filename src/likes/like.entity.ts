import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { Publication } from '../publications/publication.entity';


@Entity()
@Unique(["userId", "publicationId"])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userId', type: 'int' })
  userId: number;

  @Column({ name: 'publicationId', type: 'int' })
  postId: number;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @ManyToOne(() => Publication, { nullable: false })
  publication: Publication;
}
