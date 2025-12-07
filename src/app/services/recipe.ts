import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
  This service is responsible for talking to the Spoonacular API.
  It has two main jobs:
  1. Search for recipes based on ingredients typed on the Home page.
  2. Load full details for a single recipe when the user opens the details page.
*/

// API key given in the assignment brief.
const API_KEY = '70759a4f7911402abcc53d3c51d3b759';

// Base URL for the recipes endpoints on Spoonacular.
const BASE_URL = 'https://api.spoonacular.com/recipes';

// The amount of data we need for lists on the Home/Favourites pages.
export interface RecipeSummary {
  id: number;
  title: string;
  image: string;
}

// Describe how ingredient measurements are structured in the API.
export interface IngredientMeasure {
  amount: number;
  unitLong: string;
}

export interface IngredientDetails {
  original: string;
  measures: {
    metric: IngredientMeasure;
    us: IngredientMeasure;
  };
}

// This describes the detailed recipe data returned by Spoonacular.
export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  extendedIngredients: IngredientDetails[];
  analyzedInstructions: {
    steps: { number: number; step: string }[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // HttpClient used to send HTTP requests to the API.
  constructor(private http: HttpClient) {}

  /*
    Search for recipes based on the text entered on the Home page.

    The API used is the "complexSearch" endpoint.
    It expects:
      - apiKey: our API key
      - query: the search text (ingredients, e.g. "chicken, pasta")
  */
  searchRecipes(query: string): Observable<{ results: RecipeSummary[] }> {
    // Build the query parameters.
    const params = new HttpParams()
      .set('apiKey', API_KEY)
      .set('query', query);

    // Send a GET request to: https://api.spoonacular.com/recipes/complexSearch
    // and ask TypeScript to treat the response as an object with a results array.
    return this.http.get<{ results: RecipeSummary[] }>(
      `${BASE_URL}/complexSearch`,
      { params }
    );
  }

  /*
    Get full details for a single recipe.

    The API endpoint is:
      /recipes/{id}/information
  */
  getRecipeDetails(id: number): Observable<RecipeDetails> {
    const params = new HttpParams()
      .set('apiKey', API_KEY);

    // Example URL: https://api.spoonacular.com/recipes/12345/information
    return this.http.get<RecipeDetails>(
      `${BASE_URL}/${id}/information`,
      { params }
    );
  }
}
