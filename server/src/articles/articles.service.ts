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
  findAll(options: {
    author?: string;
    title?: string;
    categoryId?: number;
    tagIds?: number[];
    createdAt?: string[];
  }): Promise<Article[]> {
    const query: any = {};

    if (options.author) {
      query.author = { $regex: options.author, $options: 'i' };
    }
    if (options.title) {
      query.title = { $regex: options.title, $options: 'i' };
    }
    if (options.categoryId) {
      query.categoryId = options.categoryId;
    }

    if (options.tagIds && options.tagIds.length > 0) {
      query.tagIds = { $all: options.tagIds };
    }
    if (options.createdAt && options.createdAt.length === 2) {
      query.createdAt = {
        $gte: new Date(options.createdAt[0]),
        $lte: new Date(options.createdAt[1]),
      };
    }
    return this.articleModel.find(query).select('-__v -_id').exec();
  }

  // 详情
  findOne(id: number): Promise<Article | null> {
    return this.articleModel.findOne({ uid: id }).select('-_id').exec();
  }

  update(updateArticleDto: UpdateArticleDto): Promise<Article | null> {
    updateArticleDto.updatedAt = new Date();
    return this.articleModel
      .findOneAndUpdate({ id: updateArticleDto.id }, updateArticleDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string): Promise<Article | null> {
    return this.articleModel.findOneAndDelete({ id }).exec();
  }
}
