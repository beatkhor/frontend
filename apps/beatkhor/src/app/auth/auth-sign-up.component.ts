import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Component} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../core/services/error-handler.service'
import {SnackbarService} from '../core/services/snackbar.service'
import {AuthService} from '../core/services/auth.service'

@Component({
  selector: 'bk-sign-up',
  template: `<div class="min-h-screen flex items-center justify-center">
    <form
      *ngIf="!done"
      [formGroup]="form"
      (submit)="onSubmit()"
      class="flex flex-col w-96 py-4 mx-6"
    >
      <h1 class="text-2xl font-semibold my-2">Sign Up</h1>

      <p class="text-base py-3 mb-2">
        <span>Welcome to Beatkhor. </span>
        <span>Please fill this form to create a shiny new account.</span>
      </p>

      <mat-form-field class="my-3" appearance="fill">
        <mat-label>Email</mat-label>
        <input
          matInput
          type="text"
          name="email"
          spellcheck="false"
          formControlName="email"
        />
        <mat-icon matSuffix>person</mat-icon>
        <mat-hint>We will send the activation link to this email.</mat-hint>
        <mat-error>Please enter your email or username!</mat-error>
      </mat-form-field>

      <mat-form-field class="my-3" appearance="fill">
        <mat-label>Password</mat-label>
        <input matInput type="password" name="password" formControlName="password" />
        <mat-icon matSuffix>lock</mat-icon>
        <mat-hint>A password should include at least 6 characters.</mat-hint>
        <mat-error>Please enter at least 6 characters!</mat-error>
      </mat-form-field>

      <mat-form-field class="my-3" appearance="fill">
        <mat-label>Confirm Password</mat-label>
        <input
          matInput
          type="password"
          name="confirmPassword"
          formControlName="confirmPassword"
        />
        <mat-icon matSuffix>lock</mat-icon>
        <mat-hint>Please type your password again to confirm</mat-hint>

        <mat-error *ngIf="form.controls['confirmPassword']?.hasError('mismatch')">
          <span>The passwords do not match together</span>
        </mat-error>

        <mat-error *ngIf="form.controls['confirmPassword']?.hasError('required')">
          <span>Please re-enter your password</span>
        </mat-error>
      </mat-form-field>

      <button mat-flat-button class="my-3" color="primary" type="submit">
        <span *ngIf="isLoading">Please wait...</span>
        <span *ngIf="!isLoading">Sign Up</span>
      </button>

      <a mat-stroked-button color="primary" type="button" routerLink="/">
        <span>Go Back</span>
      </a>

      <div class="my-5 text-sm text-neutral-300">
        <p class="my-2">
          <span>Already have an account? </span>
          <a class="text-primary-500" routerLink="/authentication/signin">
            <span>sign in now!</span>
          </a>
          <span>.</span>
        </p>

        <p class="my-2">
          <span>Have an account and forgotten your password? you can easily </span>
          <a class="text-primary-500" routerLink="/authentication/forgot">
            <span>recover your password here</span>
          </a>
          <span>.</span>
        </p>
      </div>
    </form>

    <div *ngIf="done" class="flex flex-col w-96 py-4 mx-6">
      <h1 class="text-2xl font-semibold my-2">One More Step...</h1>

      <p class="py-4">
        Congrats! We just sent you an email that contains the verification link. You can
        sign in after activating your account.
      </p>

      <a class="my-3" mat-stroked-button color="primary" type="button" routerLink="/">
        <span>Let's go back</span>
      </a>
    </div>
  </div>`,
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
      confirmPassword: ['', [Validators.required, confirmValidator]],
    })
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return this.snackbar.error('Please fill the form with valid information!')
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
        return this.snackbar.error('This email is already used by an account!', 'OK')
      }
      this.errHandler.handle(error)
    }
  }
}

function confirmValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const value = String(control.value ?? '')
  const original = String(control.parent?.value.password ?? '')
  if (value === original) {
    return null
  }

  return {mismatch: true}
}
