import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<CategoryDocument>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<any> {
    const total = await this.categoryModel.countDocuments(); // 获取总记录数
    const list = await this.categoryModel.find().select('-__v').exec();

    const data = {
      list,
      total,
    };

    return {
      success: true,
      data,
      errorMessage: '',
    };
  }

  update(updateCategoryDto: UpdateCategoryDto) {
    updateCategoryDto.updatedAt = new Date();
    return this.categoryModel
      .findOneAndUpdate({ id: updateCategoryDto.id }, updateCategoryDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string) {
    return this.categoryModel.findOneAndDelete({ id }).exec();
  }
}
