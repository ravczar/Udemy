import { Ingredient } from './../../ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';
import { LoggerService } from '../../logger/logger.service';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private ingredients: Array<Ingredient> = new Array<Ingredient>();
  actualIngredients = new EventEmitter<Array<Ingredient>>();
  
  constructor(private loggerService: LoggerService) { 
    this.ingredients.push(new Ingredient('Bread', 20));
    this.ingredients.push(new Ingredient('Butter', 15));
    this.ingredients.push(new Ingredient('Cornflakes', 12));
    this.ingredients.push(new Ingredient('Milk', 18));
    this.ingredients.push(new Ingredient('Honey', 22));
    this.ingredients.push(new Ingredient('Apples', 3));
  }

  getIngredients(){
    this.loggerService.logRequestedIngrediens();
    return this.ingredients.slice();
  }

  setIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.actualIngredients.emit(this.ingredients.slice()); //emit only a copy of that array
    this.loggerService.logNewIngredientAdded();
  }

}
