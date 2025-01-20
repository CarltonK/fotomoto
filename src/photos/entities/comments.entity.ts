import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './../../users/entities/user.entity';
import { Photo } from './photo.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Photo, (photo) => photo.comments, { onDelete: 'CASCADE' })
  photo: Photo;

  @CreateDateColumn()
  commentedAt: Date;
}
