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
  // TODO 字符串模糊查询
  findAll(options: {
    author?: string;
    title?: string;
    categoryId?: number;
    tagIds?: number[];
    created_at?: string[];
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
      query.tagIds = { $in: options.tagIds }; // 使用 $in 操作符查询 tagIds
    }
    if (options.created_at && options.created_at.length === 2) {
      query.createdAt = {
        $gte: new Date(options.created_at[0]),
        $lte: new Date(options.created_at[1]),
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
