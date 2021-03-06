import { AuthGuardGuard } from './shared/services/auth-guard/auth-guard.guard';
import { AuthComponent } from './auth/auth.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesResolverService } from './shared/resolvers/recipes-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch:'full'},
  { path: 'recipes', component: RecipesComponent, canActivate:[AuthGuardGuard], children:[
    { path: '', component: RecipeStartComponent },
    { path: 'new', component:RecipeEditComponent },
    { path: ':id', component:RecipeDetailComponent, resolve: [RecipesResolverService] },
    { path: ':id/edit', component:RecipeEditComponent, resolve: [RecipesResolverService] },
  ] },
  { path: 'shopping-list', component: ShoppingListComponent},
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
