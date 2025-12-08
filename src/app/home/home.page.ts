import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService, RecipeSummary } from '../services/recipe';
import { LoadingController } from '@ionic/angular'; 
/*
  First page the user sees.
  It allows searching for recipes by typing ingredients.
*/

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  // This will hold whatever the gets typed into the search box.
  ingredientsText: string = '';

  // Array stores the recipes returned from the API.
  recipeResults: RecipeSummary[] = [];

  studentNumber = 'G00472939';  // Displayed at the top of the page.

  constructor(
  private recipeService: RecipeService,
  private router: Router,
  private loadingCtrl: LoadingController
) {}


  /*
    Called when the user taps the Search button.
    If the input is empty, do nothing.
  */
 async searchForRecipes() {
    const cleanedInput = this.ingredientsText.trim();

    if (cleanedInput.length === 0) {
      return;
    }

    //Show loading spinner
    const loader = await this.loadingCtrl.create({
      message: 'Searching recipes...',
      spinner: 'circles'
    });
    await loader.present();

    // Call RecipeService to search Spoonacular.
    this.recipeService.searchRecipes(cleanedInput).subscribe(async response => {
      // API returns an object containing "results".
      this.recipeResults = response.results;

      // Hide spinner
      await loader.dismiss();
      
    });

  }

  /*
    When pressing the Details button on a recipe,
    navigate to the details page and pass the recipe ID.
  */
  openRecipeDetails(recipe: RecipeSummary) {
    this.router.navigate(['/recipe-details', recipe.id]);
  }

  // Opens the favourites page when the heart icon is tapped.
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  // Opens the settings page when the settings icon is tapped.
  goToSettings() {
    this.router.navigate(['/settings']);
  }
}

