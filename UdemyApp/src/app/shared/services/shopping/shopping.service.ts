import { Ingredient } from '../../models/ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';
import { LoggerService } from '../../logger/logger.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private ingredients: Array<Ingredient> = new Array<Ingredient>();
  //actualIngredients = new EventEmitter<Array<Ingredient>>();
  actualIngredients = new Subject<Array<Ingredient>>();
  startedEditing = new Subject<number>();

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

  setIngredient(ingredient: Ingredient):void{
    this.ingredients.push(ingredient);
    //this.actualIngredients.emit(this.ingredients.slice()); //emit only a copy of that array
    this.actualIngredients.next(this.ingredients.slice());
    this.loggerService.logNewIngredientAdded();
  }

  addIngredients(ingredients: Array<Ingredient>):void{
    this.ingredients.push(...ingredients);
    //this.actualIngredients.emit(this.ingredients.slice()); //emit only a copy of that array
    this.actualIngredients.next(this.ingredients.slice());
    this.loggerService.logNewIngredientAdded();
  }

}
