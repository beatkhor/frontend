import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {debounceTime, lastValueFrom} from 'rxjs'
import {Component} from '@angular/core'
import {Router} from '@angular/router'

import {CustomErrorHandler} from '../core/services/error-handler.service'
import {CustomValidators} from '../core/services/validators.service'
import {AuthService} from '../core/services/auth.service'

@Component({
  selector: 'bk-complete-profile',
  template: `<div class="min-h-screen flex items-center justify-center">
    <form [formGroup]="form" (submit)="onSubmit()" class="flex flex-col w-96 py-4 mx-6">
      <h1 class="text-2xl font-semibold my-2">Setup your profile</h1>

      <p class="py-4">
        Now it's time to setup your beatkhor profile. Please provide the details below and
        choose a unique username for yourself.
      </p>

      <mat-form-field class="my-3" appearance="fill">
        <mat-label>First name</mat-label>
        <input matInput formControlName="first_name" type="text" name="first_name" />
        <mat-hint>Will be displayed on public profile</mat-hint>
        <mat-error>Please enter your first name</mat-error>
      </mat-form-field>

      <mat-form-field class="my-3" appearance="fill">
        <mat-label>Last name</mat-label>
        <input matInput formControlName="last_name" type="text" name="last_name" />
        <mat-hint>Entering the last name is optional</mat-hint>
        <mat-error>Please enter your last name</mat-error>
      </mat-form-field>

      <mat-form-field class="my-3" appearance="fill">
        <mat-label>Username</mat-label>
        <input
          matInput
          type="text"
          name="username"
          spellcheck="false"
          formControlName="username"
        />

        <mat-error *ngIf="form.get('username')?.hasError('minLength')">
          <span>Username should be at least 4 characters.</span>
        </mat-error>

        <mat-error *ngIf="form.get('username')?.hasError('usernameValid')">
          <span>Username can only have a-z and 0-9 characters</span>
        </mat-error>

        <mat-hint *ngIf="form.get('username')?.invalid">
          <span>Username can only have a-z and 0-9</span>
        </mat-hint>

        <mat-hint *ngIf="form.get('username')?.valid && searchedOnce">
          <span *ngIf="isUsernameAvailable"> Cool, this username is available!</span>
          <span class="text-red-400" *ngIf="!isUsernameAvailable">
            This username is taken! Try something else.
          </span>
        </mat-hint>

        <div
          *ngIf="form.controls['username'].valid && usernameLoading"
          class="spinner-container"
          matSuffix
        >
          <mat-spinner [diameter]="23"></mat-spinner>
        </div>

        <mat-icon
          matSuffix
          class="text-accent-200"
          *ngIf="
            form.controls['username'].valid &&
            form.value['username'] &&
            !usernameLoading &&
            isUsernameAvailable
          "
        >
          done
        </mat-icon>
        <mat-icon
          matSuffix
          color="warn"
          *ngIf="
            form.controls['username'].valid &&
            form.value['username'] &&
            !usernameLoading &&
            !isUsernameAvailable
          "
        >
          close
        </mat-icon>
      </mat-form-field>

      <button mat-flat-button class="my-4 mt-6" color="primary" type="submit">
        <span *ngIf="isLoading">Please wait...</span>
        <span *ngIf="!isLoading">Continue</span>
      </button>
    </form>
  </div>`,
})
export class CompleteProfileComponent {
  isUsernameAvailable = false
  usernameLoading = false
  searchedOnce = false
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
      username: [
        '',
        [Validators.required, CustomValidators.username, Validators.minLength(4)],
      ],
      first_name: ['', [Validators.required, Validators.maxLength(64)]],
      last_name: ['', [Validators.maxLength(64)]],
    })

    this.form.controls['username'].valueChanges.pipe(debounceTime(300)).subscribe({
      next: value => {
        this.searchedOnce = true
        this.usernameLoading = true
        this.checkUsernameAvailability(value)
      },
    })
  }

  private async checkUsernameAvailability(value: string): Promise<void> {
    try {
      const request$ = this.authService.checkUsernameAvailability(value)
      const result = await lastValueFrom(request$)
      this.isUsernameAvailable = result.result.available
      this.usernameLoading = false
    } catch (error) {
      this.usernameLoading = false
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || !this.isUsernameAvailable) {
      this.form.markAllAsTouched()
      return
    }

    try {
      this.form.disable()
      this.isLoading = true
      const request$ = this.authService.updateMe(
        this.form.value.username,
        this.form.value.first_name,
        this.form.value.last_name
      )

      await lastValueFrom(request$)

      const user = this.authService.getLoggedInUser()
      this.authService.putLoggedInUser({
        ...user,
        first_name: this.form.value.first_name,
        last_name: this.form.value.last_name,
        username: this.form.value.username,
      })

      this.isLoading = false
      this.form.enable()
      this.router.navigate(['/'])
    } catch (error: any) {
      this.form.enable()
      this.isLoading = false
      this.errHandler.handle(error)
    }
  }
}
