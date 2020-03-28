import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('singleRecipe') recipe:Recipe;
  @Input() index: number;
  
  constructor() { }

  ngOnInit(): void {
  }


}
