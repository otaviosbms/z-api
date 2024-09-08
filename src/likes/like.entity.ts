import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Publication } from '../publications/publication.entity';

@Entity()
@Unique(["user", "publication"])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.likes, { nullable: false })
  user: User;

  @ManyToOne(() => Publication, publication => publication.likes, { nullable: false })
  publication: Publication;
}
