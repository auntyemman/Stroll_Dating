import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { regionCodeEnum } from 'src/utils/types';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, index: true })
  region: regionCodeEnum;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Question' })
  currentQuestion: string;

  @Prop({ type: Number, default: 0 })
  lastUpdatedCycle: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
