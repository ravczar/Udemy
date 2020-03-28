import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Array<Recipe>;

  constructor(private recipeService:RecipeService, private router: Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.actualRecipes.subscribe(
      (recipsWatched: Array<Recipe>) => {this.recipes = recipsWatched}
    );
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
