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
  
    /**
     * Crée un nouveau repas.
     *
     * @param {CreateFoodDto} createFoodDto - Les données du repas à créer.
     * @returns {Promise<FoodEntity>} Le repas créé.
     */
    // @UseGuards(new RoleGuard(Roles.ADMIN))
    @Post()
    async create(
      @Body(ValidationPipe) createFoodDto: CreateFoodDto
    ): Promise<FoodEntity> {
      return await this.foodService.create(createFoodDto);
    }
  
    /**
     * Récupère la liste de tous les repas.
     *
     * @returns {Promise<FoodEntity[]>} Un tableau de repas.
     */
    @Get()
    async findAll(): Promise<FoodEntity[]> {
      return await this.foodService.findAll();
    }
  
    /**
     * Récupère un repas spécifique en fonction de son ID.
     *
     * @param {number} id - L'ID du repas à récupérer.
     * @returns {Promise<FoodEntity>} Le repas récupéré.
     */
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<FoodEntity> {
      return await this.foodService.findById(+id);
    }
  
     /**
     * Recherche des repas en fonction d'un terme de recherche.
     *
     * @param {string} searchTerm - Le terme de recherche pour trouver des repas.
     * @returns {Promise<FoodEntity[]>} Un tableau de repas correspondant au terme de recherche.
     */
     @Get('search/:searchTerm')
     async search(@Param('searchTerm') searchTerm: string): Promise<FoodEntity[]> {
       return this.foodService.search(searchTerm);
     }
  
    /**
     * Met à jour les informations d'un repas en fonction de son ID.
     *
     * @param {number} id - L'ID du repas à mettre à jour.
     * @param {UpdateFoodDto} updateFoodDto - Les données de mise à jour du repas.
     * @returns {Promise<FoodEntity>} Le repas mis à jour.
     */
    // @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
    @Patch(':id')
    async update(
      @Param('id') id: number,
      @Body() updateFoodDto: UpdateFoodDto
    ): Promise<FoodEntity> {
      return await this.foodService.update(+id, updateFoodDto);
    }
  
    /**
     * Supprime un repas en fonction de son ID.
     *
     * @param {number} id - L'ID du repas à supprimer.
     */
    @UseGuards(new RoleGuard(Roles.ADMIN))
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      await this.foodService.remove(+id);
    }
  
   
  }
  