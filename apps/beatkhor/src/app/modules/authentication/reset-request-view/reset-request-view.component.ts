import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Component} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '@services/error-handler.service'
import {AuthService} from '@workspace/services/auth.service'

@Component({
  selector: 'bk-reset-request-view',
  templateUrl: './reset-request-view.component.html',
})
export class ResetRequestViewComponent {
  isLoading = false
  form!: FormGroup
  done = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private errHandler: CustomErrorHandler
  ) {
    this.createForm()
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return this.form.markAsTouched()
    }

    try {
      this.form.disable()
      this.isLoading = true
      const request$ = this.authService.requestResetPassword(this.form.value.email)
      await lastValueFrom(request$)
      this.isLoading = false
      this.done = true
      this.form.enable()
    } catch (error: any) {
      this.form.enable()
      this.isLoading = false
      this.errHandler.handle(error)
    }
  }
}
