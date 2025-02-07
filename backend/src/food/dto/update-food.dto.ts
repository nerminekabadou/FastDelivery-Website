import { CreateFoodDto } from './create-food.dto';
import { IsString, IsInt } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {

  @IsString()
  name: string;
  
  @IsInt()
  price: number;

  @IsString()
  imageUrl: string;

  @IsString()
  description: string;
}
