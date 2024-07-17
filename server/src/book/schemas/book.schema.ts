import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type BookDocument = Book & Document;

@Schema()
export class Book extends Document {
  @Prop({ default: uuidv4 })
  id: string;

  @Prop()
  author: string;

  @Prop()
  title: string;

  @Prop()
  categoryId: string;

  @Prop()
  tagIds: number[];

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  cover: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
