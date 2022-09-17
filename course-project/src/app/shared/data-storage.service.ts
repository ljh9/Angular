import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService) {}

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
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.get<Recipe[]>(
                    'https://ng-course-recipe-book-9edc3-default-rtdb.firebaseio.com/recipes.json', 
                    {
                        params: new HttpParams().set('auth', user.token)
                    }
                );
            }), 
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }), 
            tap(recipes => {
                this.recipesService.setRecipes(recipes);
            })
        );
    }

}