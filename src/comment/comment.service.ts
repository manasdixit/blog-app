import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  create(comment: Partial<Comment>) {
    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find({ relations: ['blogPost'] });
  }

  findOne(id: number) {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['blogPost'],
    });
  }

  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
