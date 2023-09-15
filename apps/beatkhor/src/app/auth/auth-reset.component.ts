import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../core/services/error-handler.service'
import {CustomValidators} from '../core/services/validators.service'
import {CallbackEvents} from '../core/models/callback-events'
import {AuthService} from '../core/services/auth.service'

@Component({
  selector: 'bk-reset',
  template: ` <div class="min-h-screen flex items-center justify-center">
    <form
      *ngIf="!done"
      [formGroup]="form"
      (submit)="onSubmit()"
      class="flex flex-col w-96 py-4 mx-6"
    >
      <h1 class="text-2xl font-semibold my-2">Reset password</h1>

      <p class="py-4">
        Now you can choose a brand new password for your beatkhor account.
      </p>

      <mat-form-field class="my-3" appearance="fill">
        <mat-label>New password</mat-label>
        <input matInput type="password" name="password" formControlName="password" />
        <mat-icon matSuffix>lock</mat-icon>
        <mat-hint>A password should include at least 6 characters.</mat-hint>
        <mat-error>Please enter at least 6 characters!</mat-error>
      </mat-form-field>

      <mat-form-field class="my-3" appearance="fill">
        <mat-label>Confirm password</mat-label>
        <input
          matInput
          type="password"
          name="confirmPassword"
          formControlName="confirmPassword"
        />
        <mat-icon matSuffix>lock</mat-icon>
        <mat-hint>Please type your password again to confirm</mat-hint>

        <mat-error *ngIf="form.get('confirmPassword')?.hasError('mismatch')">
          <span>The passwords do not match together</span>
        </mat-error>

        <mat-error *ngIf="form.get('confirmPassword')?.hasError('required')">
          <span>Please re-enter your password</span>
        </mat-error>
      </mat-form-field>

      <button mat-flat-button class="my-3 mt-5" color="primary" type="submit">
        <span *ngIf="isLoading">Please wait...</span>
        <span *ngIf="!isLoading">Reset password</span>
      </button>

      <a mat-stroked-button color="primary" type="button" routerLink="/">
        <span>Home page</span>
      </a>
    </form>

    <div *ngIf="done" class="flex flex-col w-96 py-4 mx-6">
      <h1 class="text-2xl font-semibold my-2">Your password is changed</h1>

      <p class="py-4">
        Perfect! We changed your password. Go ahead and sign in using your new password.
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
        <span>Back to home page</span>
      </a>
    </div>
  </div>`,
})
export class ResetComponent implements OnInit {
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
