import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Array<Ingredient> = new Array<Ingredient>();

  constructor() { 
    this.ingredients.push(new Ingredient('Bread', 20));
    this.ingredients.push(new Ingredient('Butter', 15));
    this.ingredients.push(new Ingredient('Cornflakes', 12));
    this.ingredients.push(new Ingredient('Milk', 18));
    this.ingredients.push(new Ingredient('Honey', 22));
    this.ingredients.push(new Ingredient('Apples', 3));
  }

  ngOnInit(): void {
  }

  onIngredientAdded(addedIngredient: Ingredient){
    this.ingredients.push(addedIngredient);
  }

}
