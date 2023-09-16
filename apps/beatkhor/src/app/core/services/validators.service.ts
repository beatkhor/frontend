import {Injectable} from '@angular/core'
import {AbstractControl} from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class CustomValidators {
  static confirmPassword(control: AbstractControl): {[key: string]: boolean} | null {
    const value = String(control.value ?? '')
    const original = String(control.parent?.value.password ?? '')
    if (value === original) {
      return null
    }

    return {mismatch: true}
  }

  static username(control: AbstractControl): {[key: string]: boolean} | null {
    const usernameRegex = /^[a-z0-9_]+$/
    const value = String(control.value || '').toLowerCase()
    if (value !== undefined && usernameRegex.test(value)) {
      return null
    }

    return {usernameValid: true}
  }
}
