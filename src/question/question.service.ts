import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { QuestionDocument } from './schemas/question.schema';
import { QuestionRepository } from './question.repository';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  /**
   * Get the next question based on the cycle and region.
   */
  async createQuestion(
    createQuestionDTO: CreateQuestionDto,
  ): Promise<QuestionDocument> {
    try {
      return await this.questionRepository.create(createQuestionDTO);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  };

  /**
 * Get the questions based on the region.
 */
  async getRegionQuestions(region: string): Promise<QuestionDocument[]> {
    try {
      return await this.questionRepository.find({ region });
    } catch (error) {
      throw new NotFoundException(error);
    }
  };
  /**
   * Get the current question based on the current cycle and region.
   */
  async getCycleQuestion(
    region: string,
    currentCycle: number,
  ): Promise<QuestionDocument> {
    const question = await this.questionRepository.findOne({
      region,
      cycle: currentCycle,
    });
    return question;
  }
}
