import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RecipeService } from '../services/recipe/recipe.service';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }
  // httpClent to send HTTP requests in this service. @Injectable to be able get/inject HttpClient
  // 1. Save recipes
  // 2. Store recipes

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://ng-rafal-recipe.firebaseio.com/recipes.json',
      recipes
      ).subscribe(
        (response)=> {
          console.log(response);
        }
      );
  }

  fetchRecipes() {
    console.log("fetching recipes");
    this.http.get<Recipe[]>(
      'https://ng-rafal-recipe.firebaseio.com/recipes.json'
      ).subscribe(
        (response) => {
          console.log(response);
          this.recipeService.setRecies(response);
        }

    );
  }



}
