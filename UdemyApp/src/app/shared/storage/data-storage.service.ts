import { AuthService } from './../services/authentication/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RecipeService } from '../services/recipe/recipe.service';
import { Recipe } from '../models/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient, 
    private recipeService: RecipeService, 
    private authService: AuthService
    ) { 
    this.fetchRecipes();
  }
  // httpClent to send HTTP requests in this service. @Injectable to be able get/inject HttpClient
  // 1. Save recipes
  // 2. Store recipes
  // 3. No data subscribe in component (no use)

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
    console.log("FETCHING RECIPE");
    return this.http.get<Recipe[]>(
      'https://ng-rafal-recipe.firebaseio.com/recipes.json',    
    )
    .pipe(
      map( recipes => {
        // add empty array if no ingredients in the recipe!!! (firebase stuff protection)
        return recipes.map( recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }),
      tap( recipes => {
        // add some code without altering the data.
        console.log(recipes);
        this.recipeService.setRecies(recipes);
      })
    );
  }



}
