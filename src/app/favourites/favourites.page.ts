import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavouritesService } from '../services/favourites';
import { RecipeSummary } from '../services/recipe';

/*
  This page displays all recipes the user marked as favourites.
  The list is loaded from FavouritesService, which stores the data
  using Ionic Storage so it stays after the app is closed.
*/

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss']
})
export class FavouritesPage implements OnInit {

  // List of favourite recipes to show in the UI.
  favouritesList: RecipeSummary[] = [];

  constructor(
    private favService: FavouritesService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load all saved favourites from the service.
    this.favouritesList = this.favService.getAll();
  }

  // Navigate to the recipe details screen for this recipe.
  openDetails(id: number) {
    this.router.navigate(['/recipe-details', id]);
  }
}
