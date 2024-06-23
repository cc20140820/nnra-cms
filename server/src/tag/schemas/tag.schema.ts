import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v1 as uuidv1 } from 'uuid';

export type TagDocument = Tag & Document;

@Schema()
export class Tag extends Document {
  @Prop({ default: uuidv1 })
  id: string;

  @Prop()
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
