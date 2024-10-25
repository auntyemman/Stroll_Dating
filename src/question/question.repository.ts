import { BaseRepository } from 'src/utils/base.repository';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class QuestionRepository extends BaseRepository<QuestionDocument> {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
  ) {
    super(questionModel);
  }
}
