import { Ingredient } from './../../shared/models/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  editMode:Boolean = false;
  recipeForm: FormGroup;

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
        // initialize form with data
        this.initForm();
      }
    );
  }
  private initForm(): void{
    let recipeName: string =  this.editMode ? this.recipe.name : '';
    let recipeImagePath: string = this.editMode ? this.recipe.imagePath : '';
    let recipeDescription: string = this.editMode ? this.recipe.description : '';
    let recipeIngredients = new FormArray([]);

    if(this.recipe['ingredients']){ //this.recipe.ingredients.length > 0
      console.log("This recipe has ingredients! number: " + this.recipe.ingredients.length);
      for (let ingredient of this.recipe.ingredients){
        console.log("Pushing item to recipeIngredients");
        recipeIngredients.push(
          new FormGroup(
            {
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            }
          )
        );
        console.log("Długość utworzonej tablicy: " + recipeIngredients.length);
      }
    }

    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName),
        'imagePath': new FormControl(recipeImagePath),
        'description': new FormControl(recipeDescription),
        'ingredients': recipeIngredients
      }
    );
  }

  onSubmit():void{
    console.log(this.recipeForm);
  }

  getImagePath(): string{
    return this.editMode ? this.recipe.imagePath : '';
  }

  get controls(): AbstractControl[]{  // getter
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
