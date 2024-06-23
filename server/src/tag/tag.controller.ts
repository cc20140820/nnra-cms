import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createCategoryDto: CreateTagDto) {
    return this.tagService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Patch()
  update(@Body() updateCategoryDto: UpdateTagDto) {
    return this.tagService.update(updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
