import { Component, OnInit } from '@angular/core';
import { SettingsService, UnitOption } from '../services/settings';

/*
  This page lets you choose whether you want
  recipe ingredients shown using Metric or US units.
  The value is saved using SettingsService so the choice
  is remembered even after app is shutdown.
*/

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {

  // Holds the selected unit.
  selectedUnit: UnitOption = 'metric';

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    // Load the user’s previously chosen unit.
    this.selectedUnit = this.settingsService.getUnit();
  }

  /*
    Called whenever the user switches the buttons.
    Saves the new value to storage.
  */
  async onUnitChange() {
    await this.settingsService.setUnit(this.selectedUnit);
  }
}

