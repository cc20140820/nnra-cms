import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/add')
  create(@Body() createArticleDto: CreateBookDto) {
    return this.bookService.create(createArticleDto);
  }

  @Post()
  @HttpCode(200)
  findAll(
    @Body()
    query: {
      current: number;
      pageSize: number;
      author?: string;
      title?: string;
      categoryId?: number;
      tagIds?: number[];
      createdAt?: string[];
    },
  ) {
    // 确保分页参数有默认值
    const current = query.current || 1;
    const pageSize = query.pageSize || 10;
    return this.bookService.findAll(current, pageSize, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch()
  update(@Body() updateArticleDto: UpdateBookDto) {
    return this.bookService.update(updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
