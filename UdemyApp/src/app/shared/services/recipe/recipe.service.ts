import { DataStorageService } from './../../storage/data-storage.service';
import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';
import { LoggerService } from '../../logger/logger.service';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingService } from '../shopping/shopping.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Array<Recipe> = new Array<Recipe>();
  //actualRecipes = new EventEmitter<Array<Recipe>>();
  //selectedRecipe = new EventEmitter<Recipe>();
  actualRecipes = new Subject<Array<Recipe>>();
  
  constructor( private loggerService: LoggerService, private shoppingService: ShoppingService) { 
   
    /*this.recipes.push(new Recipe('Pancakes recipe', 
      'Test recipe description', 
      'https://www.garneczki.pl/blog/wp-content/uploads/2018/07/przepis-na-sniadaniowe-placuszki.jpg',
      //[new Ingredient('Potatoes', 22), new Ingredient('Eggs', 10)] ));
      new Array<Ingredient>(new Ingredient('Potatoes', 22), new Ingredient('Eggs', 10)) ));
    this.recipes.push(new Recipe('Pasta recipe', 
      'Test2 recipe description', 
      'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2019/02/Cheesy-mince-pasta-bake.jpg',
      //[new Ingredient('Potatoes', 22), new Ingredient('Eggs', 10)] ));
      new Array<Ingredient>(new Ingredient('Corn', 3), new Ingredient('Bread', 7)) ));
    this.recipes.push(new Recipe('Tost recipe', 
      'Test2 recipe description', 
      'https://s.mamotoja.pl/i/tost-zapiekanka-kanapka-BIG-24119.jpg',
      //[new Ingredient('Potatoes', 22), new Ingredient('Eggs', 10)] ));
      new Array<Ingredient>(new Ingredient('Cheese', 11), new Ingredient('Onion', 8)) )); */
  }

  public getRecipes(): Array<Recipe>{
    this.loggerService.logRequestedRecipes();
    return this.recipes.slice(); // now returns a copy, not a reference
  }

  public getRecipeById(id:number): Recipe{
    this.loggerService.logRequestedSingleRecipeById(id);
    return this.recipes.slice()[id]; // now return shallow copy
  }

  public setRecie(recipe: Recipe): void {
    this.recipes.push(recipe);
    //this.actualRecipes.emit(this.recipes.slice()); // emit ony a copy of this array
    this.actualRecipes.next(this.recipes.slice()); // subject, emit copy of array
    this.loggerService.logNewRecipeAdded();
  }

  public setRecies(recipes: Recipe[]): void {
    this.recipes = recipes;
    //this.actualRecipes.emit(this.recipes.slice()); // emit ony a copy of this array
    this.actualRecipes.next(this.recipes.slice()); // subject, emit copy of array
    this.loggerService.logNewRecipeAdded();
  }
  
  public updateRecipe(recipeIndex: number, updatedRecipe: Recipe){
    this.recipes[recipeIndex] = updatedRecipe;
    this.actualRecipes.next(this.recipes.slice());
    this.loggerService.logRecipeUpdated(recipeIndex);
  }

  public deleteRecipe(recipeIndex: number){
    this.recipes.splice(recipeIndex, 1);
    this.actualRecipes.next(this.recipes.slice());
    this.loggerService.logRecipeDeleted(recipeIndex);
  }

  public addSelectedIngredientsToShoppingList(ingredients : Array<Ingredient>):void {
    this.shoppingService.addIngredients(ingredients);
  }
  

}
