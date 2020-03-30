import { ShoppingService } from './../../shared/services/shopping/shopping.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (recipe_id:number) => {
        this.editMode = true;
        this.editedItemIndex = recipe_id;
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
