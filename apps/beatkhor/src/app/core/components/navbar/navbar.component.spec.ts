import {ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {HttpClientModule} from '@angular/common/http'
import {MatDialog} from '@angular/material/dialog'
import {CommonModule} from '@angular/common'
import {of} from 'rxjs'

import {LocalStorageService} from '@workspace/services/local-storage.service'
import {ConfirmDialogComponent} from '@shared/dialogs/confirm-dialog'
import {AuthService} from '@workspace/services/auth.service'
import {environment} from '@environments/environment'
import {ENVIRONMENT_CONFIG} from '@workspace/models'
import {SharedModule} from '@shared/shared.module'
import {NavbarComponent} from './navbar.component'
import {Router} from '@angular/router'

describe('NavbarComponent', () => {
  let component: NavbarComponent
  let fixture: ComponentFixture<NavbarComponent>
  let authService: AuthService
  let router: Router
  let dialog: MatDialog

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, CommonModule, HttpClientModule, RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [
        MatDialog,
        AuthService,
        LocalStorageService,
        {
          provide: ENVIRONMENT_CONFIG,
          useValue: environment,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(NavbarComponent)
    component = fixture.componentInstance
    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router)
    dialog = TestBed.inject(MatDialog)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit menu event on menu()', () => {
    const emitSpy = jest.spyOn(component.menu, 'emit')
    component.onMenu()
    expect(emitSpy).toHaveBeenCalled()
  })

  it('should call dialog.open() on onLogout()', () => {
    const openSpy = jest.spyOn(dialog, 'open')
    const dialogRefMock = {afterClosed: () => of(true)}
    openSpy.mockReturnValue(dialogRefMock as any)

    component.onLogout()
    expect(openSpy).toHaveBeenCalledWith(ConfirmDialogComponent, expect.any(Object))
  })

  it('should reset authService and navigate on onLogoutResult() if response is true', () => {
    const resetSpy = jest.spyOn(authService, 'reset')
    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl')
    const dialogRefMock = {afterClosed: () => of(true)}
    const closeSpy = jest.spyOn(dialogRefMock, 'afterClosed')
    closeSpy.mockReturnValue(of(true))

    component['onLogoutResult'](true)
    expect(resetSpy).toHaveBeenCalled()
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/')
  })

  it('should not reset authService and navigate on onLogoutResult() if response is false', () => {
    const resetSpy = jest.spyOn(authService, 'reset')
    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl')
    const dialogRefMock = {afterClosed: () => of(false)}
    const closeSpy = jest.spyOn(dialogRefMock, 'afterClosed')
    closeSpy.mockReturnValue(of(false))

    component['onLogoutResult'](false)
    expect(resetSpy).not.toHaveBeenCalled()
    expect(navigateByUrlSpy).not.toHaveBeenCalled()
  })
})
