import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';  // ✅ Correct import
import { Food } from 'src/app/shared/models/Food';  // ✅ Import Food model

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  searchResults: Food[] = [];  // ✅ Store search results

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private foodService: FoodService  // ✅ Inject FoodService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        this.searchTerm = params.searchTerm;
        this.fetchSearchResults();  // ✅ Fetch results when search term changes
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

  /**
   * ✅ Fetch search results from FoodService
   */
  fetchSearchResults(): void {
    if (this.searchTerm) {
      this.foodService.getAllFoodsBySearchTerm(this.searchTerm).subscribe(
        (results) => {
          console.log('Résultats de la recherche:', results);
          this.searchResults = results;  // ✅ Store results
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    }
  }
}
