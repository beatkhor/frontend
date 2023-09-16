import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {CallbackEvents} from '../core/models/callback-events'

@Component({
  selector: 'bk-index',
  template: `<div class="container mx-auto px-5">
    <ng-container [ngSwitch]="notice">
      <bk-notice
        *ngSwitchCase="callbackEvents.AccountActivationSuccess"
        [mode]="'success'"
        [message]="'Awesome, your account is now activated!'"
        (close)="onCloseNotice()"
      ></bk-notice>

      <bk-notice
        *ngSwitchCase="callbackEvents.AccountActivationFailed"
        [mode]="'error'"
        [message]="
          'OOps, We could not activate your account! Please contact the support.'
        "
        (close)="onCloseNotice()"
      ></bk-notice>

      <bk-notice
        *ngSwitchCase="callbackEvents.ResetPasswordVerificationFailed"
        [mode]="'error'"
        [message]="
          'OOps, We could not verify the password recovery link. Please try again or contact the support.'
        "
        (close)="onCloseNotice()"
      ></bk-notice>
    </ng-container>
  </div>`,
})
export class IndexComponent implements OnInit {
  readonly callbackEvents = CallbackEvents
  notice!: string | null

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.notice = this.route.snapshot.queryParamMap.get('notice')
  }

  onCloseNotice() {
    this.notice = null
  }
}
