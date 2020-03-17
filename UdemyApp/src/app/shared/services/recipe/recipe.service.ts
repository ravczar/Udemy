import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { LoggerService } from '../../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Array<Recipe> = new Array<Recipe>();
  actualRecipes = new EventEmitter<Array<Recipe>>();
  selectedRecipe = new EventEmitter<Recipe>();
  
  constructor(private loggerService: LoggerService) { 
    this.recipes.push(new Recipe('Pancakes recipe', 'Test recipe description', 'https://www.garneczki.pl/blog/wp-content/uploads/2018/07/przepis-na-sniadaniowe-placuszki.jpg' ));
    this.recipes.push(new Recipe('Pasta recipe', 'Test2 recipe description', 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2019/02/Cheesy-mince-pasta-bake.jpg'));
    this.recipes.push(new Recipe('Tost recipe', 'Test2 recipe description', 'https://s.mamotoja.pl/i/tost-zapiekanka-kanapka-BIG-24119.jpg'));}

  public getRecipes(): Array<Recipe>{
    this.loggerService.logRequestedRecipes();
    return this.recipes.slice(); // now returns a copy, not a reference
  }

  public setRecie(recipe: Recipe):void {
    this.recipes.push(recipe);
    this.actualRecipes.emit(this.recipes.slice()); // emit ony a copy of this array
    this.loggerService.logNewRecipeAdded();
  }
}
