import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";
// import { AuthService } from "../auth/auth.service";
// import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(
        // private dataStorageService: DataStorageService, 
        // private authService: AuthService, 
        private store: Store<fromApp.AppState>){}

    collapsed = true;

    ngOnInit(){
        // this.userSub = this.authService.user.subscribe(user => {
        this.userSub = this.store.select('auth').pipe(map(authState => authState.user))
        .subscribe(user => {
            // this.isAuthenticated = !user ? false: true;
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });
    }

    onSaveData(){
        // this.dataStorageService.storeRecipes();
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData() {
        // this.dataStorageService.fetchRecipes().subscribe();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout(){
        // this.authService.logout();
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

}