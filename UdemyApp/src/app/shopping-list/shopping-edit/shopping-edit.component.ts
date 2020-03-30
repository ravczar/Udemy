import { ShoppingService } from './../../shared/services/shopping/shopping.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f', {static: false}) form :NgForm;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (recipe_id:number) => {
        this.editMode = true;
        this.editedItemIndex = recipe_id;
        this.editedItem = this.shoppingService.getIngredient(recipe_id);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddIngredient(form: NgForm){
    console.log("Składniki: "+ form.value.name +" && " + form.value.amount);
    this.shoppingService.setIngredient(
      new Ingredient(
        form.value.name,
        form.value.amount
      )
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
