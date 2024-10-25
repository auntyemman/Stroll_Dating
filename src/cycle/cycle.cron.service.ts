import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CycleService } from './cycle.service';
import { BullQueueService } from './cycle.queue.service';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);

  constructor(
    private readonly bullQueueService: BullQueueService,
    private readonly cycleService: CycleService,
  ) {}

  /**
   * Schedule weekly question cycle job, running at the configured time (default: every Monday(1) 7(19) PM SGT).
   * Use Bull queue to manage this cron task.
   */
  @Cron('0 19 * * 1', {
    timeZone: 'Asia/Singapore',
  })
  async cycleCron() {
    this.logger.log('Triggering weekly cycle assignment...');
    // Enqueue user update tasks in Bull queue
    await this.bullQueueService.enqueueCycleJob();
    this.logger.log('Sent to queue...');
  }
}
