import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ArticleDocument = Article & Document;

@Schema()
export class Article extends Document {
  @Prop({ default: uuidv4 })
  id: string;

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
