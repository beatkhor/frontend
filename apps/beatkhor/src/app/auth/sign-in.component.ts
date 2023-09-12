import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { CustomErrorHandler } from "../core/services/error-handler.service";
import { AuthService } from "../core/services/auth.service";

@Component({
  selector: "bk-sign-in",
  template: `<div class="min-h-screen flex items-center justify-center">
    <form
      [formGroup]="form"
      (submit)="onSubmit()"
      class="flex flex-col w-96 py-4 mx-6"
    >
      <h1 class="text-2xl font-semibold my-2">Sign In</h1>

      <p class="text-base my-3">
        <span>Welcome back! </span>
        <span
          >Please provide your email and password to sign into your
          account.</span
        >
      </p>

      <mat-form-field class="my-3" appearance="fill">
        <mat-label>Email / Username</mat-label>
        <input
          matInput
          type="text"
          name="username"
          spellcheck="false"
          formControlName="username"
        />
        <mat-icon matSuffix>person</mat-icon>
        <mat-hint>You can use your username or email to sign in</mat-hint>
        <mat-error>Please enter your email or username!</mat-error>
      </mat-form-field>

      <mat-form-field class="my-3" appearance="fill">
        <mat-label>Password</mat-label>
        <input
          matInput
          type="password"
          name="password"
          formControlName="password"
        />
        <mat-icon matSuffix>lock</mat-icon>
        <mat-hint>A password should include at least 6 characters.</mat-hint>
        <mat-error>Please enter at least 6 characters!</mat-error>
      </mat-form-field>

      <button mat-flat-button class="my-3" color="primary" type="submit">
        <span *ngIf="isLoading">Please wait...</span>
        <span *ngIf="!isLoading">Sign In</span>
      </button>

      <button mat-stroked-button color="primary" type="submit">
        <mat-icon>arrow_back</mat-icon>
        <span>Home Page</span>
      </button>
    </form>
  </div>`,
})
export class SignInComponent {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private errHandler: CustomErrorHandler
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return this.form.markAsTouched();
    }

    try {
      this.form.disable();
      this.isLoading = true;
      const request$ = this.authService.login(
        this.form.value.username,
        this.form.value.password
      );
      const response = await lastValueFrom(request$);

      this.authService.setToken(response.result.token);
      this.authService.putLoggedInUser(response.result.user);
      this.isLoading = false;
      this.form.enable();

      if (!response.result.user.profile_completed) {
        this.router.navigate(["routine", "complete-profile"]);
        return;
      }

      this.router.navigate(["/"]);
    } catch (error: any) {
      this.form.enable();
      this.isLoading = false;
      this.errHandler.handle(error);
    }
  }
}
