import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from '../../shared/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipe:Recipe;

  constructor(private recipeService: RecipeService ) { }

  ngOnInit(): void {
  }

  onAddToShoppingList(){
    this.recipeService.addSelectedIngredientsToShoppingList( this.selectedRecipe.ingredients);
  }

}
