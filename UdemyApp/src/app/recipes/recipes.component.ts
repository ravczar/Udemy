import { Recipe } from '../shared/models/recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/services/recipe/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe:Recipe;
  constructor(private recipeService: RecipeService) { 
    this.recipeService.selectedRecipe.subscribe((recipeWatched:Recipe)=>{this.selectedRecipe = recipeWatched});
  }

  ngOnInit(): void {
  }

}
