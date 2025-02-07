import { IsNumber, Min } from 'class-validator';
import { CreateFoodDto } from 'src/food/dto/create-food.dto';

export class OrderItemDto {
  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  food: CreateFoodDto;
}