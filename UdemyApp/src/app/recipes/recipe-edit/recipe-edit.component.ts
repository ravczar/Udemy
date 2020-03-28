import { Ingredient } from './../../shared/models/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  editMode:Boolean = false;

  constructor(private recipeService : RecipeService,
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log("edit param: "+this.editMode);
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
    );

  }

}
