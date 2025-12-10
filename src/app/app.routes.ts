import { Routes } from '@angular/router';

export const routes: Routes = [

  // Default route
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // Home page
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage)
  },

  // Recipe details page
  {
    path: 'recipe-details/:id',
    loadComponent: () =>
      import('./recipe-details/recipe-details.page').then((m) => m.RecipeDetailsPage)
  },

  // Settings page
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage)
  },

  // Favourites page
  {
    path: 'favourites',
    loadComponent: () =>
      import('./favourites/favourites.page').then((m) => m.FavouritesPage)
  }
];
