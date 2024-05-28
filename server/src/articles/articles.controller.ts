import { Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';

@Controller('articles')
export class ArticlesController {
  @HttpCode(HttpStatus.OK)
  @Get('list')
  getArticleList() {
    return [
      { author: 'jack', book: 'BID' },
      { author: 'rose', book: 'BIDX' },
      { author: 'keyi', book: 'BIDD' },
    ];
  }
}
