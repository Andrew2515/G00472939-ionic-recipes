import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe';
import { SettingsService } from '../services/settings';
import { FavouritesService } from '../services/favourites';
import { LoadingController } from '@ionic/angular'; 
/*
  Displays full information about a single recipe.
  Shows the list of ingredients, steps, and a button for
  adding or removing the recipe from favourites.
*/

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss']
})
export class RecipeDetailsPage implements OnInit {

  recipeId!: number;
  recipeData: any = null;   // Holds all details from the API.
  chosenUnit: 'metric' | 'us' = 'metric';
  favouriteButtonText = 'Add to Favourites';

  constructor(
  private route: ActivatedRoute,
  private recipeService: RecipeService,
  private settingsService: SettingsService,
  private favService: FavouritesService,
  private loadingCtrl: LoadingController
) {}


 async ngOnInit() {
    // Read recipe ID from the route.
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
       // Get preferred measurement unit.
    this.chosenUnit = this.settingsService.getUnit();

  // Show loading spinner while details load
  const loader = await this.loadingCtrl.create({
    message: 'Loading recipe...',
    spinner: 'crescent'
  });
  await loader.present(); 


    // Load full recipe details from Spoonacular.
    this.recipeService.getRecipeDetails(this.recipeId).subscribe(async data => {
      this.recipeData = data;

      // Update the favourite button text depending on saved status.
      if (this.favService.isFavourite(this.recipeId)) {
        this.favouriteButtonText = 'Remove From Favourites';
      } else {
        this.favouriteButtonText = 'Add to Favourites';
      }

      await loader.dismiss(); 
    });
  }

  /*
    Returns the amount of a particular ingredient by using the chosen unit.
  */
  getAmount(ingredient: any): number {
    return this.chosenUnit === 'metric'
      ? ingredient.measures.metric.amount
      : ingredient.measures.us.amount;
  }

  /*
    Returns the unit for the chosen measurement system.
  */
  getUnitName(ingredient: any): string {
    return this.chosenUnit === 'metric'
      ? ingredient.measures.metric.unitLong
      : ingredient.measures.us.unitLong;
  }

  /*
    Add or remove the recipe from favourites.
    Updates the text button after this action.
  */
  async toggleFavourite() {
    if (this.favService.isFavourite(this.recipeId)) {
      await this.favService.remove(this.recipeId);
      this.favouriteButtonText = 'Add to Favourites';
    } else {
      // Build a summary object to save.
      const summary = {
        id: this.recipeId,
        title: this.recipeData.title,
        image: this.recipeData.image
      };
      await this.favService.add(summary);
      this.favouriteButtonText = 'Remove From Favourites';
    }
  }
}

