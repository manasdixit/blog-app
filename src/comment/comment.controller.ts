import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommentDto: Partial<Comment>) {
    return this.commentService.create(createCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
