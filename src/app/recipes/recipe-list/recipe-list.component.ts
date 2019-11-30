import { Component, OnInit, Output, EventEmitter, AfterContentInit, AfterViewInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeToDisplaySelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    // tslint:disable-next-line: max-line-length
    new Recipe('Chilli Con Carne', 'A test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg'),
    // tslint:disable-next-line: max-line-length
    new Recipe('Chicken curry', 'A test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg')
  ];

  constructor() { }

  ngOnInit() {
    this.recipeToDisplaySelected.emit(this.recipes[0]);
  }

  onRecipeClicked(recipe) {
    this.recipeToDisplaySelected.emit(recipe);
  } 

}
