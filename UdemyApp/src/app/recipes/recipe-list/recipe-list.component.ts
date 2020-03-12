import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Array<Recipe> = new Array<Recipe>();

  constructor() { 
    this.recipes.push(new Recipe('Test recipe', 'Test recipe description', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.foodnetwork.com%2Frecipes%2Free-drummond%2F4-cheese-pepperoni-pizzadilla-7260186&psig=AOvVaw1vJ0B1ip5gj9JxyYh6FeEz&ust=1584103170166000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLiT7q36lOgCFQAAAAAdAAAAABAJ' ));
  }

  ngOnInit(): void {
  }

}
