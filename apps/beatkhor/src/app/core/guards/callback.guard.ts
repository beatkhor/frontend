import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router'
import {Injectable} from '@angular/core'

import {CallbackEvents} from '../models/callback-events'

@Injectable({
  providedIn: 'root',
})
export class CallbackGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.url.toString() === 'callback') {
      const event = route.queryParamMap.get('event')

      const params = {...route.queryParams}
      delete params['event']

      switch (event) {
        case CallbackEvents.AccountActivationFailed:
          console.warn(CallbackEvents.AccountActivationFailed, 'not implemented')
          this.router.navigate(['/'])
          break

        case CallbackEvents.AccountActivationSuccess:
          console.warn(CallbackEvents.AccountActivationSuccess, 'not implemented')
          this.router.navigate(['/'])
          break

        case CallbackEvents.ResetPassword:
          this.router.navigate(['authentication', 'reset-password', 'reset'], {
            queryParams: params,
          })
          break

        case CallbackEvents.ResetPasswordVerificationFailed:
          console.warn(CallbackEvents.ResetPasswordVerificationFailed, 'not implemented')
          this.router.navigate(['/'])
          break

        default:
          this.router.navigate(['/'])
          break
      }
    }

    return false
  }
}
