import { Controller, Post, Body, Res, Query, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() body: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.createUser(body);

    return res.status(201).json({
      status: 'success',
      message: 'user created succesfully',
      data: { user },
    });
  }
  
  @Get()
  async getUserByRegion(@Query() query: any, @Res() res: Response){
    const { region } = query;
    const user = await this.userService.getUsersByRegion(region);

    return res.status(200).json({
      status: 'success',
      message: 'user fetch succesfully',
      data: { user },
    });
  }
}
