import {Component, EventEmitter, Output} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {Router} from '@angular/router'

import {ConfirmDialogComponent} from '../../shared/dialogs/confirm-dialog'
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'bk-navbar',
  template: `
    <div class="fixed left-0 right-0 top-0 h-14 border-b-2 border-neutral-800">
      <div class="container mx-auto h-full flex items-stretch justify-between px-5">
        <div class="flex items-center text-neutral-300">
          <div class="flex">
            <div class="block md:hidden mr-2">
              <button mat-icon-button (click)="onMenu()">
                <mat-icon>menu</mat-icon>
              </button>
            </div>

            <a routerLink="/" class="flex items-center">
              <img class="w-6 mr-4" src="assets/images/logo-dark.svg" alt="Beatkhor" />
              <strong class="font-semibold">Beatkhor</strong>
            </a>

            <div class="hidden items-center h-full mx-12 md:flex mr-2">
              <a
                class="px-4 py-4 hover:bg-neutral-700 ease-in duration-100"
                routerLink="/browse"
              >
                <span>Browse</span>
              </a>
              <a
                class="px-4 py-4 hover:bg-neutral-700 ease-in duration-100"
                routerLink="/about"
              >
                <span>About</span>
              </a>
            </div>
          </div>
        </div>

        <div *ngIf="!isLoggedIn; else userActions" class="flex text-neutral-300">
          <a
            class="px-4 py-4 hover:bg-neutral-700 ease-in duration-100"
            routerLink="/authentication"
          >
            <span>Sign In</span>
          </a>
          <a
            class="px-4 py-4 hover:bg-neutral-700 ease-in duration-100"
            routerLink="/authentication/signup"
          >
            <span>Get Started</span>
          </a>
        </div>

        <ng-template #userActions>
          <div class="flex">
            <button class="px-4 py-4" [matMenuTriggerFor]="userActionsMenu">
              <mat-icon>person</mat-icon>
              <mat-icon>arrow_drop_down</mat-icon>
            </button>
          </div>
        </ng-template>
      </div>
    </div>

    <mat-menu #userActionsMenu="matMenu">
      <a mat-menu-item disabled [routerLink]="'/u/' + user.username">
        <mat-icon>person</mat-icon>
        <span>Profile</span>
      </a>
      <a mat-menu-item disabled routerLink="/upload/track">
        <mat-icon>upload</mat-icon>
        <span>Upload</span>
      </a>
      <button mat-menu-item (click)="onLogout()">
        <mat-icon>logout</mat-icon>
        <span>Sign Out</span>
      </button>
    </mat-menu>
  `,
})
export class NavbarComponent {
  @Output() menu = new EventEmitter<void>()

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  get user() {
    return this.authService.getLoggedInUser()
  }

  onMenu(): void {
    this.menu.emit()
  }

  onLogout(): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      autoFocus: false,
      data: {
        title: 'Sign out',
        message: 'Are you sure about signing out of your account?',
      },
    })

    ref.afterClosed().subscribe(response => this.onLogoutResult(response))
  }

  private onLogoutResult(response: boolean): void {
    if (response) {
      this.authService.reset()
      this.router.navigateByUrl('/')
    }
  }
}
