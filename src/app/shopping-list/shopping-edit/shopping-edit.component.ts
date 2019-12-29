import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) newIngredientForm: NgForm;
  newIngredient: Ingredient;
  formSubmitted = false;
  editIngredientSub: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editIngredientSub = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.newIngredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.newIngredientForm.valid) {
      this.newIngredient = new Ingredient(this.newIngredientForm.value.name, this.newIngredientForm.value.amount);
      if (!this.editMode) {
        this.shoppingListService.addIngredient(this.newIngredient);
      }
      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editItemIndex, this.newIngredient);
      }
      this.formSubmitted = false;
      this.newIngredientForm.reset();
    }
  }

  onClear() {
    this.formSubmitted = false;
    this.editMode = false;
    this.newIngredientForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.editIngredientSub.unsubscribe();
  }

}
