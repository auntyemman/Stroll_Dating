import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { RegionService } from './region.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';
import { QuestionRepository } from './question.repository';
import { Region, RegionSchema } from './schemas/region.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository, RegionService],
  exports: [QuestionService, RegionService],
})
export class QuestionModule {}
