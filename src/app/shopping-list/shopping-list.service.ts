import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Red pepper', 2),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Grapes', 4),
        new Ingredient('Beef', 1)
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // ingredients.forEach(ingredient => {
        //     this.addIngredient(ingredient);
        // });
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredient(index: number) {
        return this.ingredients.slice()[index];
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}