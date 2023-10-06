import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {Component} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '@services/error-handler.service'
import {CustomValidators} from '@services/validators.service'
import {SnackbarService} from '@services/snackbar.service'
import {AuthService} from '@services/auth.service'
@Component({
  selector: 'bk-sign-up-view',
  templateUrl: './sign-up-view.component.html',
})
export class SignUpComponent {
  isLoading = false
  form!: FormGroup
  done = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private errHandler: CustomErrorHandler
  ) {
    this.createForm()
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, CustomValidators.confirmPassword]],
    })
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return this.snackbar.error($localize`Please fill the form with valid information!`)
    }

    try {
      this.form.disable()
      this.isLoading = true
      const request$ = this.authService.register(
        this.form.value.email,
        this.form.value.password
      )
      await lastValueFrom(request$)
      this.isLoading = false
      this.form.enable()
      this.done = true
    } catch (error: any) {
      this.form.enable()
      this.isLoading = false
      if (error?.error?.message === 'duplicated_entry') {
        return this.snackbar.error(
          $localize`'This email is already used by an account!`,
          $localize`OK`
        )
      }
      this.errHandler.handle(error)
    }
  }
}
