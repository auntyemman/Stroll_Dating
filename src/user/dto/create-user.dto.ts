import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { regionCodeEnum } from 'src/utils/types';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(regionCodeEnum)
  region: regionCodeEnum;

  @IsOptional()
  @IsString()
  currentQuestion?: string;

  @IsOptional()
  @IsNumber()
  lastUpdatedCycle?: number;
}
