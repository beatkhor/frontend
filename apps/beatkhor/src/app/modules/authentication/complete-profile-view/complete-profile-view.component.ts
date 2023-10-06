import {Subject, debounceTime, lastValueFrom, takeUntil} from 'rxjs'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Component, OnDestroy} from '@angular/core'
import {Router} from '@angular/router'

import {CustomErrorHandler} from '@services/error-handler.service'
import {CustomValidators} from '@services/validators.service'
import {AuthService} from '@services/auth.service'

@Component({
  selector: 'bk-complete-profile-view',
  templateUrl: './complete-profile-view.component.html',
})
export class CompleteProfileViewComponent implements OnDestroy {
  private destroy$ = new Subject<void>()
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
    const usernameValidators = [
      Validators.required,
      Validators.minLength(4),
      CustomValidators.username,
    ]

    this.form = this.fb.group({
      username: ['', usernameValidators],
      first_name: ['', [Validators.required, Validators.maxLength(64)]],
      last_name: ['', [Validators.maxLength(64)]],
    })

    this.handleUsernameChanges()
  }

  private handleUsernameChanges(): void {
    const changes$ = this.form.get('username')?.valueChanges.pipe(debounceTime(300))
    changes$?.pipe(takeUntil(this.destroy$)).subscribe({
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

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
