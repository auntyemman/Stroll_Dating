import { Module } from '@nestjs/common';
import { CycleService } from './cycle.service';
import { CycleController } from './cycle.controller';
import { BullModule } from '@nestjs/bull';
import { QuestionModule } from 'src/question/question.module';
import { UserModule } from 'src/user/user.module';
import { RedisService } from 'src/utils/redis.service';
import { CycleReopsitory } from './cycle.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './cycle.cron.service';
import { BullQueueService } from './cycle.queue.service';

@Module({
  imports: [
    QuestionModule,
    ScheduleModule.forRoot(),
    UserModule,
    BullModule.registerQueue({
      name: 'cycle-queue',
    }),
  ],
  controllers: [CycleController],
  providers: [
    CycleService,
    CycleReopsitory,
    RedisService,
    CronJobService,
    BullQueueService,
  ],
})
export class CycleModule {}
