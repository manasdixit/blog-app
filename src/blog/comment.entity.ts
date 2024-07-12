import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BlogPost } from './blog-post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  author: string;

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.comments)
  blogPost: BlogPost;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
