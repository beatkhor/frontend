import {Component, EventEmitter, Output} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {$localize} from '@angular/localize/init'
import {Router} from '@angular/router'

import {ConfirmDialogComponent} from '../../../shared/dialogs/confirm-dialog'
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'bk-navbar',
  templateUrl: './navbar.component.html',
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
        title: $localize`Sign out`,
        message: $localize`Are you sure about signing out of your account?`,
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
