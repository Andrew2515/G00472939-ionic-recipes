import { Injectable } from '@angular/core';
import { StorageService } from './storage';
import { RecipeSummary } from './recipe';

// The key used to store the favourites.
const STORAGE_KEY = 'favourite-recipes';

/*
  This service keeps track of the user's favourite recipes.
  A favourite recipe has few pieces of information:
  - the ID 
  - the recipe title
  - an image to display in the favourites
*/

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  // This array holds favourite recipes in memory.
  private favourites: RecipeSummary[] = [];

  constructor(private storage: StorageService) {
    // Load any saved favourites when app starts.
    this.loadFavourites();
  }

  // Load previously stored favourites from storage.
  private async loadFavourites(): Promise<void> {
    const savedList = await this.storage.load<RecipeSummary[]>(STORAGE_KEY);
    this.favourites = savedList ?? [];  // If nothing saved, start with empty list.
  }

  // Return favourite recipes.
  getAll(): RecipeSummary[] {
    return this.favourites;
  }

  // Check if a recipe is in the favourites.
  isFavourite(id: number): boolean {
    return this.favourites.some(r => r.id === id);
  }

  // Add a recipe to favourites and save the new list.
  async add(recipe: RecipeSummary): Promise<void> {
    if (!this.isFavourite(recipe.id)) {
      this.favourites.push(recipe);
      await this.storage.save(STORAGE_KEY, this.favourites);
    }
  }

  // Remove a recipe by ID, then save the updated list.
  async remove(id: number): Promise<void> {
    this.favourites = this.favourites.filter(r => r.id !== id);
    await this.storage.save(STORAGE_KEY, this.favourites);
  }
}
