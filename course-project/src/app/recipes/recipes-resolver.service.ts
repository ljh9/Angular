import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, of, switchMap, take } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from "@ngrx/effects";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
    // constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService){}
    constructor(private stroe: Store<fromApp.AppState>, private actions$: Actions){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const recipes = this.recipesService.getRecipes();

        // if(recipes.length ===0 ){
        //     return this.dataStorageService.fetchRecipes();
        // }else{
        //     return recipes;
        // }
        return this.stroe.select('recipes').pipe(
            take(1),
            map(recipesState => {
            return recipesState.recipes;
        }), 
        switchMap(recipes => {
            if (recipes.length === 0){
                this.stroe.dispatch(new RecipesActions.FetchRecipes());
                return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
            }else {
                return of(recipes)
            }
        }));
    }
}