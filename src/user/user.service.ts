import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Create users in a specific region.
   */
  async createUser(createUserdto: CreateUserDto): Promise<UserDocument> {
    try {
      return this.userRepository.create(createUserdto);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  /**
   * Get all users in a specific region.
   */
  async getUsersByRegion(region: string): Promise<User[]> {
    return this.userRepository.find({ region });
  }

  /**
   * Assign a new question to users in a region.
   */
  async assignQuestionToUsers(
    region: string,
    questionId: string,
    lastCycle: number
  ): Promise<void> {
    await this.userRepository.updateMany(region, questionId, lastCycle);
  }
}
