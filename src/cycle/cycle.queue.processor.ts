import { Processor, Process } from '@nestjs/bull';
// import { Job } from 'bull';
import { CycleService } from '../cycle/cycle.service';

@Processor('cycle-queue')
export class BullQueueProcessor {
  constructor(private readonly cycleService: CycleService) {}

  /**
   * Process the 'start-new-cycle' job from Bull queue.
   */
  @Process('start-new-cycle')
  async handleCycleJob() {
    // Call the CycleService to start a new cycle
    await this.cycleService.startCycle();
  }
}
