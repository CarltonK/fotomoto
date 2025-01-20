import { User } from './../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Like } from './likes.entity';
import { Comment } from './../../photos/entities/comments.entity';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: false })
  url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.photos, { eager: true })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.photo)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.photo)
  likes: Like[];

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ type: 'text', nullable: true })
  description: string;
}
