import {environment} from '@environments/environment'
import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Adds the configured prefix to the local storage key
   * @param key Key of the local storage property
   * @returns Formatted key name
   */
  private formatKey(key: string): string {
    return environment.storageKeyPrefix + '-' + key
  }

  /**
   * Reads data from the local storage
   * @param key Key of the local storage property
   * @returns returns the value from local storage
   */
  read(key: string): string | null {
    return localStorage.getItem(this.formatKey(key))
  }

  /**
   * Updates a value in local storage or creates a new entry
   * @param key Key of the local storage property
   * @param value The value to be set for the provided key
   */
  write(key: string, value: string): void {
    localStorage.setItem(this.formatKey(key), value)
  }

  /**
   * Clears all the data entries in local storage
   */
  clear(): void {
    localStorage.clear()
  }
}
