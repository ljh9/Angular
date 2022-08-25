import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe', 
            'This is simply a test', 
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
            [
                new Ingredient('Meat', 1), 
                new Ingredient('French Fires', 20)
            ]),
        new Recipe(
            'A Test Recipe22', 
            'This is simply a test22', 
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
            [
                new Ingredient('Buns', 2), 
                new Ingredient('Meat', 1)
            ])
        ];

        constructor(private slService: ShoppingListService){}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToSHoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
}