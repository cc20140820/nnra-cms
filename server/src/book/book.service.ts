import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private articleModel: Model<BookDocument>) {}

  create(createArticleDto: CreateBookDto): Promise<Book> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async findAll(
    current: number,
    pageSize: number,
    options: {
      author?: string;
      title?: string;
      categoryId?: number;
      tagIds?: number[];
      createdAt?: string[];
    },
  ): Promise<any> {
    const skip = (current - 1) * pageSize;
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
    const total = await this.articleModel.countDocuments(query); // 获取总记录数
    const list = await this.articleModel
      .find(query)
      .skip(skip)
      .limit(pageSize)
      .select('-__v')
      .exec();

    const data = {
      list,
      current,
      pageSize,
      total,
    };

    return {
      success: true,
      data,
      errorMessage: '',
    };
  }

  // 详情
  findOne(id: number): Promise<Book | null> {
    return this.articleModel.findOne({ uid: id }).exec();
  }

  update(updateArticleDto: UpdateBookDto): Promise<Book | null> {
    updateArticleDto.updatedAt = new Date();
    return this.articleModel
      .findOneAndUpdate({ id: updateArticleDto.id }, updateArticleDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string): Promise<Book | null> {
    return this.articleModel.findOneAndDelete({ id }).exec();
  }
}
