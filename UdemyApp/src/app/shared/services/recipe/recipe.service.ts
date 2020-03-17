import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';

/*@Injectable({
  providedIn: 'root'
})*/
export class RecipeService {
  private recipes: Array<Recipe> = new Array<Recipe>();
  selectedRecipe = new EventEmitter<Recipe>();
  
  constructor() { 
    this.recipes.push(new Recipe('Test recipe', 'Test recipe description', 'https://www.garneczki.pl/blog/wp-content/uploads/2018/07/przepis-na-sniadaniowe-placuszki.jpg' ));
    this.recipes.push(new Recipe('Test2 recipe', 'Test2 recipe description', 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2019/02/Cheesy-mince-pasta-bake.jpg'));
  }

  public getRecipes(): Array<Recipe>{
    return this.recipes.slice(); // now returns a copy, not a reference
  }
}
