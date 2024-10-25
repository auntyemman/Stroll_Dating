// src/cycle/dto/create-cycle.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsDateString, IsArray } from 'class-validator';

export class CreateCycleDto {
  @IsNotEmpty()
  @IsString()
  region: string;

  @IsNotEmpty()
  @IsNumber()
  cycleNumber: number;

  @IsNotEmpty()
  @IsArray() 
  questionId: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}