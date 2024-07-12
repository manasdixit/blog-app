import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogPost } from './blog-post.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() createBlogDto: Partial<BlogPost>) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAllPaginated(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search: string,
  ) {
    return this.blogService.findAllPaginated(+page, +limit, search);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: Partial<BlogPost>) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
