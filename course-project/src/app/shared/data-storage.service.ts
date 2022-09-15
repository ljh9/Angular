import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipeService) {}

    storeRecipes() {
        const recipe = this.recipesService.getRecipes();
        this.http
        .put(
            'https://ng-course-recipe-book-9edc3-default-rtdb.firebaseio.com/recipes.json', 
            recipe
        )
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        this.http
        .get<Recipe[]>('https://ng-course-recipe-book-9edc3-default-rtdb.firebaseio.com/recipes.json')
        .subscribe(recipe => {
            this.recipesService.setRecipes(recipe);
        });
    }

}