import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { regionCodeEnum } from 'src/utils/types';

export type RegionDocument = Region & Document;
@Schema()
export class Region {
  @Prop({ required: true, index: true })
  name: regionCodeEnum;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Question', required: true })
  questionSet: string[];
}

export const RegionSchema = SchemaFactory.createForClass(Region);
