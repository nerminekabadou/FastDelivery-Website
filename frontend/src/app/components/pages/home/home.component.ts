import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  food!: Food;
  foods: Food[] = [];

  constructor(
    private foodService: FoodService, 
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      let foodsObservable: Observable<Food[]>;

      if (params.id) {
        this.foodService.getFoodById(params.id).subscribe(serverFood => {
          this.food = serverFood;
        });
      }

      if (params.searchTerm) {
        // Fetch search results based on user query
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      } else {
        // Fetch all available food items
        foodsObservable = this.foodService.getAll();
      }

      // Subscribe and update the food list
      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }

  ngOnInit(): void {}

  addToCart(food: Food) {
    console.log('Ajouter au panier :', food);
    this.cartService.addToCart(food);
  }
}
