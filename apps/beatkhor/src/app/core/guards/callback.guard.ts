import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router'
import {CallbackEvents} from '@workspace/models'
import {Injectable} from '@angular/core'

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
        case CallbackEvents.AccountActivationSuccess:
        case CallbackEvents.ResetPasswordVerificationFailed:
          this.router.navigate(['/'], {
            queryParams: {
              notice: event,
            },
          })
          break

        case CallbackEvents.ResetPassword:
          this.router.navigate(['authentication', 'reset-password', 'reset'], {
            queryParams: params,
          })
          break

        default:
          this.router.navigate(['/'])
          break
      }
    }

    return false
  }
}
