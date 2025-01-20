import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './../../users/entities/user.entity';
import { Photo } from './photo.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Photo, (photo) => photo.likes, { onDelete: 'CASCADE' })
  photo: Photo;

  @CreateDateColumn()
  likedAt: Date;
}
