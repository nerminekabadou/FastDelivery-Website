import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodEntity } from './food.entity';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FoodService {
  /**
   * Service de gestion des kebabs.
   *
   * @constructor
   * @param {Repository<FoodEntity>} foodRepository - Le référentiel des entités de kebabs.
   */
  constructor(
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>
  ) { this.ensureDefaultFoods(); }
  private async ensureDefaultFoods() {
    console.log('Ensuring default food items are present...');

    const defaultFoods = [
      {
        name: "Pizza Margherita",
        price: 9.99,
        imageUrl: "https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg?v=1723650067?w=1024",
        description: "Pizza classique italienne avec sauce tomate, mozzarella et basilic.",
      },
      {
        name: "Sushi",
        price: 15.99,
        imageUrl: "https://www.lexpress.fr/resizer/v2/JFOV377ZGZDOXEKNGU2L67ES4Y.jpg?auth=21fdde0c24b33df07b489edd731272bc1e55e4048dc88f6be9c20641846dab70&width=1200&height=630&quality=85&smart=true",
        description: "Des sushis frais avec du riz savamment assaisonné, accompagnés de poissons de qualité et de sauce soja pour une expérience gustative délicieuse",
      },
      {
        name: "Pizza Fruits de Mer",
        price: 12.99,
        imageUrl: "https://images.ricardocuisine.com/services/recipes/508826330531f5a3c0e5f8.jpg",
        description: "Pizza aux fruits de mer avec crevettes, moules et sauce tomate.",
      },
      {
        name: "Spaghetti aux boulettes de viande",
        price: 11.99,
        imageUrl: "https://www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs.jpg",
        description: "Spaghetti avec boulettes de viande maison et sauce tomate.",
      },
      {
        name: "Pâtes au pesto",
        price: 10.99,
        imageUrl: "https://richanddelish.com/wp-content/uploads/2023/02/creamy-pesto-pasta-1.jpg",
        description: "Pâtes fraîches avec une sauce pesto maison au basilic et parmesan.",
      },
      {
        name: "Hamburger",
        price: 8.99,
        imageUrl: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
        description: "Burger classique avec steak haché, fromage cheddar et salade.",
      },
      {
        name: "Burger au poulet",
        price: 9.49,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8_Q9_dhNnojwi4KjDfPCyRs3ceY0QqGD4g&s",
        description: "Burger croustillant au poulet pané, salade et mayonnaise.",
      },
      {
        name: "Nuggets de poulet",
        price: 6.99,
        imageUrl: "https://t4.ftcdn.net/jpg/01/58/36/13/360_F_158361356_PsgqLvsirkpM5n9hqCn48rexuB2UWsul.jpg",
        description: "Délicieux nuggets de poulet croustillants, parfaits pour un snack.",
      },
      {
        name: "French Tacos",
        price: 10.49,
        imageUrl: "https://raisscook.com/wp-content/uploads/2022/10/french-tacos-3.jpg",
        description: "Tacos français avec sauce fromagère, viande hachée et frites.",
      },
      {
        name: "Lasagnes",
        price: 13.49,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTclXb9V_-01l2xywbl-ZZsMIwBrqsfvBxTXQ&s",
        description: "Lasagnes maison avec sauce bolognaise et fromage gratiné.",
      },
      {
        name: "Pizza Neptune",
        price: 12.99,
        imageUrl: "https://firstdeal.tn/deal/album/9sblbxq9.jpg",
        description: "Pizza classique avec du thon frais italien, et des olives.",
      }
    ];

    for (const food of defaultFoods) {
      const exists = await this.foodRepository.findOne({ where: { name: food.name } });

      if (!exists) {
        await this.foodRepository.save(food);
        console.log(`Added: ${food.name}`);
      }
    }
  }
  /**
   * Crée un nouveau kebab en utilisant les données fournies dans le DTO.
   *
   * @param {CreateFoodDto} createFoodDto - Les données du kebab à créer.
   * @returns {Promise<FoodEntity>} Le kebab créé.
   */





  async create(createFoodDto: CreateFoodDto): Promise<FoodEntity> {
    const food = this.foodRepository.create(createFoodDto);
    return await this.foodRepository.save(food);
  }

  /**
   * Récupère la liste de tous les kebabs.
   *
   * @returns {Promise<FoodEntity[]>} Un tableau des kebabs créé.
   */
  async findAll(): Promise<FoodEntity[]> {
    return await this.foodRepository.find();
  }

  /**
   * Récupère un kebab spécifique en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à récupérer.
   * @returns {Promise<FoodEntity>} Le kebab récupéré.
   * @throws {NotFoundException} Si le kebab n'est pas trouvé.
   */
  async findById(id: number): Promise<FoodEntity> {
    const food: FoodEntity = await this.foodRepository.findOne({
      where: { id: id }
    });
    if (!food) throw new NotFoundException('kebab non trouvé.');
    return food;
  }

  /**
   * Met à jour les informations d'un kebab en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à mettre à jour.
   * @param {UpdateFoodDto} updateFoodDto - Les données de mise à jour du kebab.
   * @returns {Promise<FoodEntity>} Le kebab mis à jour.
   */
  async update(id: number, updateFoodDto: UpdateFoodDto): Promise<FoodEntity> {
    const food = await this.foodRepository.findOne({ where: { id: id } });

    // Met à jour les propriétés du kebab
    food.name = updateFoodDto.name;
    food.price = updateFoodDto.price;

    return await this.foodRepository.save(food);
  }

  /**
   * Supprime un produit en fonction de son ID.
   *
   * @param {number} id - L'ID du produit à supprimer.
   */
  async remove(id: number): Promise<void> {
    const food = await this.foodRepository.findOne({ where: { id: id } });
    console.log(food);
    await this.foodRepository.remove(food);
  }

  /**
   * Recherche des kebabs en fonction d'un terme de recherche.
   *
   * @param {string} searchTerm - Le terme de recherche pour trouver des kebabs.
   * @returns {Promise<FoodEntity[]>} Un tableau de kebabs correspondant au terme de recherche.
   */
  async search(searchTerm: string): Promise<FoodEntity[]> {
    const foods = await this.foodRepository.find({
      where: {
        name: ILike(`%${searchTerm}%`)
      }
    });
    return foods;
  }
}
