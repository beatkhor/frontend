import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../../../core/services/error-handler.service'
import {AuthService} from '../../../core/services/auth.service'

@Component({
  selector: 'bk-sign-in-view',
  templateUrl: './sign-in-view.component.html',
})
export class SignInViewComponent {
  isLoading = false
  form!: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private errHandler: CustomErrorHandler
  ) {
    this.createForm()
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return this.form.markAsTouched()
    }

    try {
      this.form.disable()
      this.isLoading = true
      const request$ = this.authService.login(
        this.form.value.username,
        this.form.value.password
      )
      const response = await lastValueFrom(request$)

      this.authService.setToken(response.result.token)
      this.authService.putLoggedInUser(response.result.user)
      this.isLoading = false
      this.form.enable()

      if (!response.result.user.profile_completed) {
        this.router.navigate(['authentication', 'complete-profile'])
        return
      }

      this.router.navigate(['/'])
    } catch (error: any) {
      this.form.enable()
      this.isLoading = false
      this.errHandler.handle(error)
    }
  }
}
