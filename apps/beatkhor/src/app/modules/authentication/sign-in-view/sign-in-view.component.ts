import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '@workspace/services/error-handler.service'
import {AuthService} from '@workspace/services/auth.service'
import {SEOService} from '@workspace/services/seo.service'
import {environment} from '@environments/environment'

@Component({
  selector: 'bk-sign-in-view',
  templateUrl: './sign-in-view.component.html',
})
export class SignInViewComponent implements OnInit {
  signUpEnabled = false
  isLoading = false
  form!: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private seoService: SEOService,
    private authService: AuthService,
    private errHandler: CustomErrorHandler
  ) {
    this.createForm()
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
    this.setupSEO()
  }

  private setupSEO() {
    this.seoService.updateMeta({
      title: $localize`Sign in`,
      description: $localize`Sign into your beatkhor account and start publishing your beats today. Have fun listening and sharing new beats.`,
      noIndex: !environment.production,
      image: environment.seo.openGraph.image,
      keywords: $localize`Login Portal, Sign In, Log In, Beatkhor Account, Member Login`,
    })
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return this.form.markAsTouched()
    }

    try {
      this.form.disable()
      this.isLoading = true
      const request$ = this.authService.login(
        this.form.value.username,
        this.form.value.password
      )
      const response = await lastValueFrom(request$)

      this.authService.setToken(response.result.token)
      this.authService.putUser(response.result.user)
      this.isLoading = false
      this.form.enable()

      if (!response.result.user.profile_completed) {
        this.router.navigate(['authentication', 'complete-profile'])
        return
      }

      this.router.navigate(['/'])
    } catch (error: any) {
      this.form.enable()
      this.isLoading = false
      this.errHandler.handle(error)
    }
  }
}
