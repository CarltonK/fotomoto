import { Like } from './../../photos/entities/likes.entity';
import { Photo } from './../../photos/entities/photo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './../../photos/entities/comments.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  emailAddress: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', unique: true })
  uid: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
