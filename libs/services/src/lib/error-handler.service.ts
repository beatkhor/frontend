import {HttpErrorResponse} from '@angular/common/http'

import {Inject, Injectable} from '@angular/core'

import {ENVIRONMENT_CONFIG, EnvironmentConfig} from '@workspace/models'

import {SnackbarService} from './snackbar.service'

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandler {
  messages = this.env.messages
  constructor(
    private snackbar: SnackbarService,
    @Inject(ENVIRONMENT_CONFIG) private env: EnvironmentConfig
  ) {}

  /**
   * Handles http error messages and opens a snackbar based on it
   * @param err The http error object
   */
  handle(err: HttpErrorResponse) {
    if (err?.error?.message) {
      const message: string = err?.error?.message

      if (Object.keys(this.messages).includes(message)) {
        const msg = this.messages[message]
        if (msg) {
          this.snackbar.error(msg)
          return
        }
      }
    }

    this.snackbar.error(this.messages['other'])
  }
}
