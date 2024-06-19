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
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('/add')
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
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
    return this.articlesService.findAll(current, pageSize, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch()
  update(@Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
