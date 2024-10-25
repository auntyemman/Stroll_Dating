import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type CycleDocument = Cycle & Document;
@Schema()
export class Cycle {
  @Prop({ required: true, index: true })
  region: string;

  @Prop({ required: true })
  cycleNumber: number;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Question', required: true })
  questionId: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const CycleSchema = SchemaFactory.createForClass(Cycle);
