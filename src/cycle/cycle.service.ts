import { Injectable, Logger } from '@nestjs/common';
import { QuestionService } from '../question/question.service';
import { RegionService } from '../question/region.service';
import { UserService } from '../user/user.service';
import { Cycle, CycleDocument } from './schemas/cycle.schema';
import { CycleReopsitory } from './cycle.repository';
import { RedisService } from 'src/utils/redis.service';
import { DateTime } from 'luxon';
import { CreateCycleDto } from './dto/create-cycle.dto';

@Injectable()
export class CycleService {
  private readonly logger = new Logger(CycleService.name);

  constructor(
    private readonly questionService: QuestionService,
    private readonly regionService: RegionService,
    private readonly userService: UserService,
    private readonly redisService: RedisService,
    private readonly cycleRepository: CycleReopsitory,
  ) {}

  /**
   * Start new cycle - Fetch regions, assign questions.
   */
  async startCycle() {
    const regions = await this.regionService.getAllRegions();
    for (const region of regions) {
      const newCycle = await this.getNewCycle(region.name);
      const newCycleQuestion = await this.questionService.getCycleQuestion(
        region.name,
        newCycle,
      );
      // Create cycle
      await this.createCycle(
        region.name,
        newCycle,
        newCycleQuestion._id as string,
      );

      // Cache the current cycle question
      await this.redisService.set(
        `region:${region.name}:cycle`,
        newCycleQuestion.questionText,
      );

      // update the user schema
      const lastCycle = newCycle - 1;
      await this.userService.assignQuestionToUsers(
        region.name,
        newCycleQuestion._id as string,
        lastCycle
      );
      this.logger.log(`${newCycle} started`);
      return;
    }
  }

  /**
   * Get the current(technical the next one to process for this cycle at the due date) cycle for the region.
   * @param region
   */
  async getNewCycle(region: string): Promise<number> {
    const lastCycle = await this.cycleRepository.findOne({ region });
    return lastCycle ? lastCycle.cycleNumber + 1 : 1;

  }

  /**
   * Create a cycle with calculated start and end dates.
   */
  private async createCycle(
    region: string,
    cycleNumber: number,
    questionId: string,
  ): Promise<CycleDocument> {
    const { startDate, endDate } = this.calculateCycleDates();
    const createCycleDTO: Cycle = {
      region,
      cycleNumber,
      questionId,
      startDate,
      endDate
    } //as CreateCycleDto
    const cycle = this.cycleRepository.create(createCycleDTO);

    return cycle
  }

  /**
   * Calculate the start and end dates of the next cycle in Singapore time.
   */
  private calculateCycleDates(): { startDate: Date; endDate: Date } {
    // Get the current date in Singapore time
    const now = DateTime.now().setZone('Asia/Singapore');

    // Calculate start date as the next Monday in Singapore time
    const startDate = now.startOf('week').plus({ days: 1 }); // Monday is the start of the week

    // Calculate end date (one week later)
    const endDate = startDate.plus({ weeks: 1 });

    return { startDate: startDate.toJSDate(), endDate: endDate.toJSDate() }; // Convert to native JS Date
  }
}
