import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogPost } from './blog-post.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBlogDto: Partial<BlogPost>) {
    return this.blogService.create(createBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllPaginated(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search: string,
  ) {
    return this.blogService.findAllPaginated(+page, +limit, search);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: Partial<BlogPost>) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
