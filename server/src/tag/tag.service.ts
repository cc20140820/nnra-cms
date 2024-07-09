import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagService {
  constructor(@InjectModel('Tag') private tagModel: Model<TagDocument>) {}

  create(createCategoryDto: CreateTagDto): Promise<Tag> {
    const createdCategory = new this.tagModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<any> {
    const list = await this.tagModel.find().select('-__v').exec();
    return {
      success: true,
      data: list,
      errorMessage: '',
    };
  }

  update(updateCategoryDto: UpdateTagDto) {
    updateCategoryDto.updatedAt = new Date();
    return this.tagModel
      .findOneAndUpdate({ id: updateCategoryDto.id }, updateCategoryDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string) {
    return this.tagModel.findOneAndDelete({ id }).exec();
  }
}
