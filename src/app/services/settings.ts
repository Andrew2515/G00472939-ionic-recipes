import { Injectable } from '@angular/core';
import { StorageService } from './storage';


// These are the only two options for measurements.
export type UnitOption = 'metric' | 'us';

// Key used to save the value in storage.
const STORAGE_KEY = 'measurement-unit';

/*
  This service is for remembering if the user wants
  ingredients shown in Metric or US units.

  It loads saved value when the app starts then gives pages a simple
  get/set interface so they don't need to deal with storage.
*/

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // This will hold the current chosen unit in memory.
  private currentUnit: UnitOption = 'metric';

  constructor(private storage: StorageService) {
    // Load previously saved value when app starts.
    this.loadUnit();
  }

  // Read the stored unit from StorageService.
  private async loadUnit(): Promise<void> {
    const savedUnit = await this.storage.load<UnitOption>(STORAGE_KEY);

    if (savedUnit) {
      // If the user has chosen a unit before, use it.
      this.currentUnit = savedUnit;
    } else {
      // First time running the app, default to metric.
      this.currentUnit = 'metric';
      await this.storage.save(STORAGE_KEY, 'metric');
    }
  }

  // Allows pages (e.g. Settings Page or Recipe Details Page) to get the unit.
  getUnit(): UnitOption {
    return this.currentUnit;
  }

  // Allows pages to update the unit and save it.
  async setUnit(unit: UnitOption): Promise<void> {
    this.currentUnit = unit;
    await this.storage.save(STORAGE_KEY, unit);
  }
}

