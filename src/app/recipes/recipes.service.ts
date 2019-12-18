import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipesService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        // tslint:disable-next-line: max-line-length
        new Recipe('Chilli Con Carne',
        'A test',
        'https://www.bbcgoodfood.com/sites/default/files/recipe_images/recipe-image-legacy-id--1001451_6.jpg',
        [
            new Ingredient('Mince Beef', 1),
            new Ingredient('Peppers', 3),
            new Ingredient('Canned Tomatoes', 5)
        ]),
        // tslint:disable-next-line: max-line-length
        new Recipe('Chicken curry',
        'A test',
        'https://www.allchickenrecipes.com/wp-content/uploads/2018/09/Chicken-Curry.jpg',
        [
            new Ingredient('Chicken breast', 4),
            new Ingredient('Tumeric', 4),
            new Ingredient('Chillis', 3)
        ])
    ];

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice(); // this returns an exact copy rather than a reference to the actual array
    }

    getRecipeWithName(name: string) {
        return this.recipes.filter((recipe) => { return recipe.name === name });
    }

    getRecipeWithId(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}