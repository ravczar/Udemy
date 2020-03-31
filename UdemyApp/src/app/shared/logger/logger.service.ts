
export class LoggerService {

  constructor() { }

  public logRequestedSingleRecipeById(id:number){
    console.log(`Recipe with id: ${id} has been requested from RecipeService`);
  }
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
  public logIngredientUpdated(index: number):void{
    console.log(`Ingredient with id ${index} has been updated.`);
  }
  public logIngredientDeleted(index: number):void{
    console.log(`Ingredient wiht id ${index} has been deleted.`);
  }

  public logRecipeUpdated(index: number):void{
    console.log(`Recipe with id ${index} has been Updated.`);
  }

  public logRecipeDeleted(index: number):void{
    console.log(`Recipe with id ${index} has been Deleted.`);
  }

}
