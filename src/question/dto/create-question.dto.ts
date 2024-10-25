import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
} from 'class-validator';
import { regionCodeEnum } from 'src/utils/types';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsEnum(regionCodeEnum)
  region: regionCodeEnum;

  @IsOptional() // Cycle is optional; if not provided, it defaults to 0
  @IsInt()
  @Min(0) // Ensure cycle is a non-negative integer
  cycle?: number = 0; // Default value

  @IsNotEmpty()
  @IsString()
  questionText: string;
}
