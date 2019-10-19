import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService{

  private recipes: Recipe[] = [
    new Recipe(
      'One Pan Autumn Chicken Dinner', 
      'It’s easy to make, the flavors are truly delicious, and clean up is a breeze. A must try chicken recipe!', 
      'https://www.cookingclassy.com/wp-content/uploads/2015/10/autumn-chicken-dinner-11-768x1152.jpg',
      [ new Ingredient('Bone-in, skin-on chicken thighs', 4), 
        new Ingredient('Brussels sprouts', 20), 
        new Ingredient('Sweet potato', 3), 
        new Ingredient('sweet baking apples', 2), 
        new Ingredient('Olive oil', 1), 
        new Ingredient('Salt and pepper', 1)]
      ),
    new Recipe(
      'Roasted plum spinach salad with candied pecans',
       'O.K. this salad is to die for, so delicious and the best kind of nutritious… the kind that feels more like a decadent indulgence.', 
       'https://eatineatout.ca/wp-content/uploads/2015/09/Roasted-Plum-Spinach-Salad-with-Candied-Pecans_sq.jpg',
       [new Ingredient('Plums', 6), 
        new Ingredient('Slices bacon, cooked, torn into pieces', 5), 
        new Ingredient('Red onion, slivered', 1), 
        new Ingredient('Baby spinach', 1), 
        new Ingredient('Pecans', 10), 
        new Ingredient('Dijon mustard', 1),
        new Ingredient('Red wine vinegar', 1)]
       )
  ];

  getRecipes(){
    return this.recipes.slice();
  }
  getRecipeById(id: number){
    return this.recipes[id];
  }
}