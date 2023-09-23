import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../../core/services/error-handler.service'
import {CustomValidators} from '../../core/services/validators.service'
import {CallbackEvents} from '../../core/models/callback-events'
import {AuthService} from '../../core/services/auth.service'

@Component({
  selector: 'bk-reset-view',
  templateUrl: './reset-view.component.html',
})
export class ResetViewComponent implements OnInit {
  token!: string | null
  isLoading = false
  form!: FormGroup
  done = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private errHandler: CustomErrorHandler
  ) {
    this.createForm()
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token')
    console.log(this.token)
    if (!this.token) {
      this.router.navigate(['/callback'], {
        queryParams: {event: CallbackEvents.ResetPasswordVerificationFailed},
      })
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, CustomValidators.confirmPassword]],
    })
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return this.form.markAsTouched()
    }

    try {
      this.form.disable()
      this.isLoading = true
      const request$ = this.authService.resetPassword(
        this.form.value.password,
        this.token ?? ''
      )
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
