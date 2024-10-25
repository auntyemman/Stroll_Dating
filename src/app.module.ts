import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { CycleModule } from './cycle/cycle.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { QUEUE_REDIS } from './utils/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UserModule,
    QuestionModule,
    CycleModule,
    BullModule.forRoot({
      redis: QUEUE_REDIS, //{
      //   host: 'localhost',
      //   port: 6379,
      // },
    }),
    // BullBoardModule.forRoot({
    //   route: '/admin/queues', // Base route for the dashboard
    //   adapter: new ExpressAdapter(), // Use Express adapter
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
