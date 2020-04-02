import { DataStorageService } from './../storage/data-storage.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve< Recipe[] > {

  constructor( private recipeService: RecipeService, private dataStorage: DataStorageService ) { }
  
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipesChecked: Array<Recipe> = this.recipeService.getRecipes();
    return recipesChecked.length === 0 ? 
      this.dataStorage.fetchRecipes() : 
      recipesChecked;
  }


}
