import { Recipe } from "./recipe.model";

export class RecipeService{
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg'),
        new Recipe('A Test Recipe22', 'This is simply a test22', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg')
        ];

    getRecipes() {
        return this.recipes.slice();
    }
}