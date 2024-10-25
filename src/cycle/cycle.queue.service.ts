import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class BullQueueService {
  constructor(@InjectQueue('cycle-queue') private cycleQueue: Queue) {}

  /**
   * Enqueue a task to assign questions to users in a region.
   */
  async enqueueCycleJob(): Promise<void> {
    await this.cycleQueue.add('start-new-cycle', {});
  }
}
