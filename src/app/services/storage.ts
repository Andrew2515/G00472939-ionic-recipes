import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


/* With this service it looks after saving and laoding bits of data (favourite country, lage page visited, etc.). 
Ionic Storage is like a small database in the background. */


@Injectable({
  providedIn: 'root'
})
export class StorageSerice {

  //Holds storage engine once set up.
  private store: Storage | null = null

  constructor(private storage: Storage){
    //App creates service, we set up storage.
    this.setupStorage();
  }
// Storage system is prepared so things can start saving.

  private async setupStorage() {
    // "create()" gives us access to the database.
    this.store = await this.storage.create();
  }

  // This saves data using a key (putting something in a labelled box).
  async save(key: string, value: any): Promise<void> {
    await this.store?.set(key, value);
  }

  // Reads back something thats saved earlier.
  async load<T>(key: string): Promise<T | null> {
    const result = await this.store?.get(key);

    // If nothing was found, return null so the app knows there is no data.
    return result ?? null;
  }

  // This removes things from storage.
  async remove(key: string): Promise<void> {
    await this.store?.remove(key);
  }
}


