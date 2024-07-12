import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './blog-post.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
  ) {}

  create(post: Partial<BlogPost>) {
    return this.blogPostRepository.save(post);
  }

  async findAllPaginated(page: number, limit: number, search: string) {
    const query = this.blogPostRepository.createQueryBuilder('post');

    if (search) {
      query.where('post.title LIKE :search OR post.content LIKE :search', {
        search: `%${search}%`,
      });
    }

    query.skip((page - 1) * limit).take(limit);

    const [posts, total] = await query.getManyAndCount();

    return { posts, total };
  }

  findAll() {
    return this.blogPostRepository.find();
  }

  findOne(id: number) {
    return this.blogPostRepository.findOne({ where: { id } });
  }

  update(id: number, updatePost: Partial<BlogPost>) {
    return this.blogPostRepository.update(id, updatePost);
  }

  remove(id: number) {
    return this.blogPostRepository.delete(id);
  }
}
