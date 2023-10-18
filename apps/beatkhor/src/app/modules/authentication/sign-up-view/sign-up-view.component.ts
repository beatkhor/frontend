import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Component, OnInit} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '@workspace/services/error-handler.service'
import {CustomValidators} from '@workspace/services/validators.service'
import {SnackbarService} from '@workspace/services/snackbar.service'
import {AuthService} from '@workspace/services/auth.service'
import {SEOService} from '@workspace/services/seo.service'
import {environment} from '@environments/environment'

@Component({
  selector: 'bk-sign-up-view',
  templateUrl: './sign-up-view.component.html',
})
export class SignUpComponent implements OnInit {
  isLoading = false
  form!: FormGroup
  done = false

  constructor(
    private fb: FormBuilder,
    private seoService: SEOService,
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

  ngOnInit(): void {
    this.setupSEO()
  }

  private setupSEO() {
    this.seoService.updateMeta({
      title: $localize`Sign up` + environment.seo.titleSeparator + environment.seo.title,
      description: $localize`Create a beatkhor account quickly with only using your email and start publishing your beats today. Have fun listening and sharing new beats.`,
      noIndex: !environment.production,
      image: environment.seo.openGraph.image,
      keywords: $localize`Beatkhor Account, Portal, Sign Up, Account Creation, Become a Member`,
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
