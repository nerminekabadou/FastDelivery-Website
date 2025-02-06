import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { Observable, sample } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FOODS_BY_SEARCH_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
// observables handle async data streams. they allow us to get data from APIs 
// by listening to real time updates and the UI can respond accordingly
  getAll(): Observable<Food[]> { // this will emit an array of Food objects when the API responds.
    return this.http.get<Food[]>(FOODS_URL);
  }


  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }
  // If a user searches for “pizza”, this function calls the API at: /api/foods/search/pizza
  // The API returns matching food items, and the UI updates when the data is received.

  getFoodById(foodId:string):Observable<Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  } 
  // Calls the API (/api/foods/123). 
  // Returns an Observable that emits the specific food item.

}