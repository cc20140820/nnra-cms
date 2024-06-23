import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v1 as uuidv1 } from 'uuid';

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends Document {
  @Prop({ default: uuidv1 })
  id: string;

  @Prop()
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
