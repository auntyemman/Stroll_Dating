import { BaseRepository } from 'src/utils/base.repository';
import { User, UserDocument } from './schemas/user.schema';
import { Model, QueryOptions, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async updateMany(
    region: string,
    questionId: string,
    lastUpdatedCycle: number,
  ): Promise<void> {
    await this.userModel
      .updateMany(
        { region },
        {
          $set: {
            currentQuestion: questionId,
            lastUpdatedCycle: lastUpdatedCycle,
          },
        },
      )
      .exec();
  }
}
