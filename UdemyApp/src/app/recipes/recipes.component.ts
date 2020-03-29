import { Recipe } from '../shared/models/recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../shared/services/recipe/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {

  }



}
