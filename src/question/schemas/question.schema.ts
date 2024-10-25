import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { regionCodeEnum } from 'src/utils/types';

export type QuestionDocument = Question & Document;
@Schema()
export class Question {
  @Prop({ required: true, index: true })
  region: regionCodeEnum;

  @Prop({ default: 0, index: true })
  cycle: number;

  @Prop({ required: true })
  questionText: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
