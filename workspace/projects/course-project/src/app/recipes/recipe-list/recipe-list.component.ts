import { Component, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
    @Output() recipeWasSelected = new EventEmitter<Recipe>();
    recipes: Recipe[] = [
        new Recipe('test recipe', 'test', 'https://thumbs.dreamstime.com/b/seamless-loopable-abstract-chess-png-grid-pattern-background-gray-squares-white-vector-171616780.jpg'),
        new Recipe('test recipe 2', 'test', 'https://thumbs.dreamstime.com/b/seamless-loopable-abstract-chess-png-grid-pattern-background-gray-squares-white-vector-171616780.jpg')
    ];

    onRecipeSelected(recipe:Recipe) {
        this.recipeWasSelected.emit(recipe);
    }
}
