import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from '../../shared/services/recipe/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe:Recipe;
  id: number;

  constructor( private recipeService: RecipeService, 
                private router:Router, 
                private route:ActivatedRoute) { }

  ngOnInit(): void {
    // works only once
    //const id = this.route.snapshot.params['id'];
    // works all the time, its ovservable
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.selectedRecipe = this.recipeService.getRecipeById(this.id);
      }
    );
  }

  onAddToShoppingList(){
    this.recipeService.addSelectedIngredientsToShoppingList( this.selectedRecipe.ingredients);
  }

  onEditRecipe(){
    //this.router.navigate(['../', this.id,'edit'], {relativeTo: this.route});
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    //this.router.navigate(['../..'], {relativeTo: this.route});
    this.router.navigate(['/recipes']);
  }

}
