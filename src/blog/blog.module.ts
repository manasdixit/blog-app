import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './blog-post.entity';
import { Comment } from './comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost, Comment])],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule {}
