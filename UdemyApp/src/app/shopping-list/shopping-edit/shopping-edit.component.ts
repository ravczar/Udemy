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

  onSumbitForm(form: NgForm){
    console.log("Składniki: "+ form.value.name +" && " + form.value.amount);
    const newIngredient = new Ingredient(this.form.value.name, this.form.value.amount);
    if (this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else if (!this.editMode){
      this.shoppingService.setIngredient(
        new Ingredient(
          form.value.name,
          form.value.amount
        )
      );
      this.editMode = false;
      this.form.reset();
    }   
  }

  clearForm(){
    this.form.reset();
    this.editMode = false;
  }

  deleteIngredient(){
    this.shoppingService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
