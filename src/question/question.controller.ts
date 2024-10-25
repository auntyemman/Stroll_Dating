import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Response } from 'express';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService,
  ) {}

  @Post('/region/questions')
  async createRegionalQuestion(
    @Body() body: CreateQuestionDto,
    @Res() res: Response,
  ) {
    const question = await this.questionService.createQuestion(body);
    return res.status(201).json({
      status: 'success',
      message: 'question created succesfully',
      data: { question },
    });
  }

  @Get('/region/questions')
  async getRegionalQuestion(@Query() query: any, @Res() res: Response) {
    const { region } = query;
    const question = await this.questionService.getRegionQuestions(region);
    return res.status(200).json({
      status: 'success',
      message: 'question fetch succesfully',
      data: { question },
    });
  }

  // // fetches current question for use based on region
  // @Get('/region/questions/current/:userId')
  // async getCurrentCycleQuestion(@Param('userId') id: any, @Res() res: Response) {
  //   const user = await this
  //   const cycle = user;
  //   const question = await this.questionService.getCycleQuestion(region, cycle);
  //   return res.status(201).json({
  //     status: 'success',
  //     message: 'question created succesfully',
  //     data: { question },
  //   });
  // }
}
