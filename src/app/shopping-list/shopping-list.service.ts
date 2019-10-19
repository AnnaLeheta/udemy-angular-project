import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 3),
    new Ingredient("Eggs", 2)
  ];
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  getIngredients() {
    return this.ingredients.slice();
  }
  addRecipeIngredients(ingredients: Ingredient[]) {
    // ingredients.forEach(ingredient => {
    //   this.ingredients.push(ingredient);
    // });
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
