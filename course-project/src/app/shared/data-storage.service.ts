import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient, 
        private recipesService: RecipeService, 
        // private authService: AuthService
        private store: Store<fromApp.AppState>
        ) {}

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
        return this.http
            .get<Recipe[]>(
                'https://ng-course-recipe-book-9edc3-default-rtdb.firebaseio.com/recipes.json'
            ).pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }), 
                tap(recipes => {
                    // this.recipesService.setRecipes(recipes);
                    this.store.dispatch(new RecipesActions.SetRecipes(recipes));
                })
            );
    }

}