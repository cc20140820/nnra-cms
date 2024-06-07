import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private articleModel: Model<ArticleDocument>,
  ) {}
  create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  // TODO 分页
  // 字符串模糊查询
  findAll(options: { author?: string; title?: string }): Promise<Article[]> {
    const query: any = {};
    if (options.author) {
      query.author = options.author;
    }
    if (options.title) {
      query.title = options.title;
    }
    return this.articleModel.find(query).select('-_id').exec();
  }

  // 详情
  findOne(id: number): Promise<Article | null> {
    return this.articleModel.findOne({ uid: id }).select('-_id').exec();
  }

  update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article | null> {
    return this.articleModel
      .findByIdAndUpdate(id, updateArticleDto, { new: true })
      .exec();
  }

  remove(id: string): Promise<Article | null> {
    return this.articleModel.findByIdAndDelete(id).exec();
  }
}
