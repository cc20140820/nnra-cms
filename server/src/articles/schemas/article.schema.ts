import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as autoIncrement from 'mongoose-auto-increment';

export type ArticleDocument = Article & Document;

@Schema()
export class Article extends Document {
  @Prop()
  id: number;

  @Prop()
  author: string;

  @Prop()
  title: string;

  @Prop()
  categoryId: number;

  @Prop()
  tagIds: number[];

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
ArticleSchema.plugin(autoIncrement.plugin, { model: 'Article', field: 'id' });
