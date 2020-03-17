
export class LoggerService {

  constructor() { }

  public logRequestedRecipes():void{
    console.log("Recipes list has been requested from RecipeService");
  }
  public logNewRecipeAdded():void{
    console.log("New Recipe has been added to Recipe Array in RecipeService");
  }

  public logRequestedIngrediens():void {
    console.log("Ingrediens list has been requested from ShoppingService");
  }
  public logNewIngredientAdded():void{
    console.log("New Ingredient has been added to Ingredient Array in ShoppingService");
  }

}
