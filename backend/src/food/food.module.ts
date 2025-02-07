import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodEntity } from './food.entity';

import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from '../users/entities/user-roles.enum';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createFoodDto: CreateFoodDto
  ): Promise<FoodEntity> {
    return await this.foodService.create(createFoodDto);
  }


  @Get()
  async findAll(): Promise<FoodEntity[]> {
    return await this.foodService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FoodEntity> {
    return await this.foodService.findById(+id);
  }

   @Get('search/:searchTerm')
   async search(@Param('searchTerm') searchTerm: string): Promise<FoodEntity[]> {
     return this.foodService.search(searchTerm);
   }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFoodDto: UpdateFoodDto
  ): Promise<FoodEntity> {
    return await this.foodService.update(+id, updateFoodDto);
  }


  @UseGuards(new RoleGuard(Roles.ADMIN))
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.foodService.remove(+id);
  }

 
}
