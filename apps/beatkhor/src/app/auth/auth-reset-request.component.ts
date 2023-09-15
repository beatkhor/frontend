import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Component} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../core/services/error-handler.service'
import {AuthService} from '../core/services/auth.service'

@Component({
  selector: 'bk-reset-request',
  template: `
    <div class="min-h-screen flex items-center justify-center">
      <form
        *ngIf="!done"
        [formGroup]="form"
        (submit)="onSubmit()"
        class="flex flex-col w-96 py-4 mx-6"
      >
        <h1 class="text-2xl font-semibold my-2">Password Recovery</h1>

        <p class="py-4">
          No worries! Just enter your email to reset your account password. We will send
          you an email with the link to choose a new password.
        </p>

        <mat-form-field class="my-3" appearance="fill">
          <mat-label>Your Email</mat-label>
          <input
            matInput
            type="text"
            name="email"
            spellcheck="false"
            formControlName="email"
          />
          <mat-icon matSuffix>mail</mat-icon>
          <mat-hint>Enter your email to receive the instructions</mat-hint>

          <mat-error *ngIf="form.get('email')?.hasError('required')">
            <span>Please enter your email!</span>
          </mat-error>

          <mat-error *ngIf="form.get('email')?.hasError('email')">
            <span>Please enter a valid email!</span>
          </mat-error>
        </mat-form-field>

        <button mat-flat-button class="my-3 mt-5" color="primary" type="submit">
          <span *ngIf="isLoading">Please wait...</span>
          <span *ngIf="!isLoading">Recover My Password</span>
        </button>

        <a
          mat-stroked-button
          color="primary"
          type="button"
          routerLink="/authentication/signin"
        >
          <span>Sign In</span>
        </a>
      </form>

      <div *ngIf="done" class="flex flex-col w-96 py-4 mx-6">
        <h1 class="text-2xl font-semibold my-2">Check Your Email</h1>

        <p class="py-4">
          Perfect! We just sent you an email that contains the instructions for choosing a
          new password.
        </p>

        <p class="py-4 text-sm text-neutral-300">
          You will not receive an email if you don't already have an account connected to
          this email
        </p>

        <a
          class="my-3"
          mat-flat-button
          color="primary"
          type="button"
          routerLink="/authentication/signin"
        >
          <span>Sign In</span>
        </a>

        <a mat-stroked-button color="primary" type="button" routerLink="/">
          <span>Go to home page</span>
        </a>
      </div>
    </div>
  `,
})
export class ResetRequestComponent {
  isLoading = false
  form!: FormGroup
  done = true

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
