import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingService } from '../shared/services/shopping/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Array<Ingredient>;
  private ingredientSubscription: Subscription;

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredientSubscription = this.shoppingService.actualIngredients.subscribe(
      (watchedIngredients:  Array<Ingredient>) => {
        this.ingredients = watchedIngredients
      });
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

}
