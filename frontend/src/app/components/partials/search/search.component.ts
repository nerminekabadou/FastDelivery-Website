import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/Food';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  searchResults: Food[] = [];  

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private foodService: FoodService  
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
        this.fetchSearchResults();  
      }
    });
  }

  ngOnInit(): void {}

  search(searchTerm: string): void {
    if (searchTerm) {
      this.router.navigateByUrl('/search/' + searchTerm);
    } else { 
      this.router.navigateByUrl('/');
    }
  }


  fetchSearchResults(): void {
    if (this.searchTerm) {
      this.foodService.getAllFoodsBySearchTerm(this.searchTerm).subscribe(
        (results) => {
          console.log('Résultats de la recherche:', results);
          this.searchResults = results;  
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    }
  }
}
