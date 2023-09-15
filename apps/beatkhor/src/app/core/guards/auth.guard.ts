import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router'
import {AuthService} from '../services/auth.service'
import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isSigninOrSignup =
      state.url === '/authentication/signin' || state.url === '/authentication/signup'
    const token = this.authService.getToken()

    if (isSigninOrSignup) {
      if (token) {
        this.router.navigate(['/'])
        return false
      } else {
        return true
      }
    } else {
      if (token) {
        return true
      }
      this.router.navigate(['authentication', 'signin'])
      return false
    }
  }
}
