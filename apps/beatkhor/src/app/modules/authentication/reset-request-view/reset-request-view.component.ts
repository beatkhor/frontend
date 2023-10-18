import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Component, OnInit} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '@workspace/services/error-handler.service'
import {AuthService} from '@workspace/services/auth.service'
import {SEOService} from '@workspace/services/seo.service'
import {environment} from '@environments/environment'

@Component({
  selector: 'bk-reset-request-view',
  templateUrl: './reset-request-view.component.html',
})
export class ResetRequestViewComponent implements OnInit {
  isLoading = false
  form!: FormGroup
  done = false

  constructor(
    private fb: FormBuilder,
    private seoService: SEOService,
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

  ngOnInit(): void {
    this.setupSEO()
  }

  private setupSEO() {
    this.seoService.updateMeta({
      title:
        $localize`Password recovery` +
        environment.seo.titleSeparator +
        environment.seo.title,
      description: $localize`Don't worry if you have forgotten your password. Just enter your email and receive the instruction for choosing a new password`,
      noIndex: !environment.production,
      image: environment.seo.openGraph.image,
      keywords: $localize`Beatkhor Account, Password Reset, Forgot Password, Password Recovery, Recover Access`,
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
