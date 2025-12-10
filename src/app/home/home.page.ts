/*
  ============================
  HOME PAGE (BEGINNER VERSION)
  ============================

  This is the first screen of my app.  
  The idea is very simple:

  - The user types some ingredients into the input box  
  - When they tap "Search", I call my RecipeService  
  - The service talks to the Spoonacular API and gets recipe ideas  
  - I show those results on the screen  
  - Each recipe has a button to open full details  
  - I also have buttons in the header for Favourites and Settings

  I wrote this page in a very simple way so it’s easy to explain in a Viva.
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecipeService, RecipeSummary } from '../services/recipe';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

  // These imports are required when using standalone components
  imports: [
    IonicModule,     // allows all <ion-*> UI tags to work
    CommonModule,    // lets me use *ngIf and *ngFor
    FormsModule      // lets me use [(ngModel)] for 2-way binding
  ]
})
export class HomePage {

  /*
    This is whatever the user types into the search box.
    I start it as an empty string.
  */
  ingredientsText: string = '';

  /*
    This will store all the recipe results that come back
    from the Spoonacular API.
  */
  recipeResults: RecipeSummary[] = [];

  /*
    I use this so I can show a "No Recipes Found" message
    only AFTER the user actually searched something.
  */
  hasSearched: boolean = false;

  /*
    My student number for the header — required in the brief.
  */
  studentNumber = 'G00472939';

  /*
    I inject three things:
      - RecipeService: to talk to the API
      - Router: to move between pages
      - LoadingController: so I can show a spinner while API loads
  */
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  /*
    ================================
    SEARCHING FOR RECIPES (MAIN PART)
    ================================
    This method runs when the user taps "Search".

    What I do:
      1. Clean the input (remove spaces before/after)
      2. If they typed nothing, I just stop
      3. Show a loading spinner
      4. Ask RecipeService to search Spoonacular
      5. When the data comes back, store it
      6. Hide the spinner
  */
  async searchForRecipes() {
    const cleanedText = this.ingredientsText.trim();

    // If user presses search but didn't type anything, do nothing
    if (cleanedText.length === 0) {
      return;
    }

    // Show a loading message while API is working
    const loader = await this.loadingCtrl.create({
      message: 'Searching recipes...',
      spinner: 'circles'
    });
    await loader.present();

    // Call my RecipeService
    this.recipeService.searchRecipes(cleanedText).subscribe(async response => {

      // Store the list of recipes
      this.recipeResults = response.results;

      // This helps display the "No results" message
      this.hasSearched = true;

      // Hide spinner now that results arrived
      await loader.dismiss();
    });
  }

  /*
    When the user taps "Details" on a recipe card,
    I go to the recipe-details page and pass the recipe ID.
  */
  openRecipeDetails(recipe: RecipeSummary) {
    this.router.navigate(['/recipe-details', recipe.id]);
  }

  /*
    Two tiny helpers to open the other pages.
  */
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }
}



