import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Array<Recipe> = new Array<Recipe>();

  constructor() { 
    this.recipes.push(new Recipe('Test recipe', 'Test recipe description', 'https://www.garneczki.pl/blog/wp-content/uploads/2018/07/przepis-na-sniadaniowe-placuszki.jpg' ));
    this.recipes.push(new Recipe('Test2 recipe', 'Test2 recipe description', 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2019/02/Cheesy-mince-pasta-bake.jpg'));
  }

  ngOnInit(): void {
  }

}
