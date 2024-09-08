import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Publication } from '../publications/publication.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', type: 'varchar', unique: true })
  username: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'text' })
  password_hash: string;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  name: string;

  @Column({ name: 'bio', type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'location', type: 'varchar', nullable: true })
  location: string;

  @Column({ name: 'website', type: 'varchar', nullable: true })
  website: string;

  @OneToMany(() => Publication, publication => publication.user, { onDelete: 'CASCADE' })
    publications: Publication[];

  @ManyToMany(() => User, user => user.followers)
  @JoinTable({
    name: 'follower',
    joinColumn: { name: 'followerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followeeId', referencedColumnName: 'id' }
  })
  following: User[];

  @ManyToMany(() => Publication, publication => publication.likers)
  likedPublications: Publication[];

  @OneToMany(() => Comment, comment => comment.user, { onDelete: 'CASCADE' })
  comments: Comment[];

  @ManyToMany(() => User, user => user.following)
  followers: User[];
}
