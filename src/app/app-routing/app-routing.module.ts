import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent, children: [
    {path: ':id', component: RecipeDetailComponent}
  ]},
  { path: 'shopping', component: ShoppingListComponent },
  { path: '**', redirectTo: 'recipes', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: false})
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
