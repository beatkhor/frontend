import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router'
import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CallbackGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.url.toString() === 'callback') {
      const event = route.queryParamMap.get('event')

      switch (event) {
        case 'account-activation-failed':
          break

        case 'account-activation-success':
          break

        case 'reset-password':
          this.router.navigate(['authentication', 'reset-password', 'reset'])
          break

        case 'reset-password-verification-failed':
          break

        default:
          this.router.navigate(['/'])
          break
      }
    }

    return false
  }
}
