import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {HttpClientModule} from '@angular/common/http'
import {CommonModule} from '@angular/common'

import {LocalStorageService} from '@workspace/services/local-storage.service'
import {UtilsService} from '@workspace/services/utils.service'
import {AuthService} from '@workspace/services/auth.service'
import {environment} from '@environments/environment'
import {ENVIRONMENT_CONFIG} from '@workspace/models'
import {SharedModule} from '@shared/shared.module'

import {WrapperComponent} from './wrapper.component'
import {NavbarComponent} from '../navbar'
import {FooterComponent} from '../footer'

describe('WrapperComponent', () => {
  let component: WrapperComponent
  let fixture: ComponentFixture<WrapperComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WrapperComponent, NavbarComponent, FooterComponent],
      imports: [
        SharedModule,
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        UtilsService,
        AuthService,
        LocalStorageService,
        {
          provide: ENVIRONMENT_CONFIG,
          useValue: environment,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(WrapperComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should toggle isSidenavOpen when toggle() is called', () => {
    const initialValue = component.isSidenavOpen
    component.toggle()
    expect(component.isSidenavOpen).toBe(!initialValue)
  })

  it('should call UtilsService.contentScrollToEnd$.next() on onScroll()', () => {
    const contentScrollToEndSpy = jest.spyOn(UtilsService.contentScrollToEnd$, 'next')
    component.onScroll()
    expect(contentScrollToEndSpy).toHaveBeenCalled()
  })

  it('should toggle isSidenavOpen when menu button in NavbarComponent is clicked', () => {
    const navbarElement: HTMLElement = fixture.nativeElement.querySelector('bk-navbar')
    const menuButton = navbarElement.querySelector('button')
    const initialValue = component.isSidenavOpen
    menuButton?.click()
    fixture.detectChanges()
    expect(component.isSidenavOpen).toBe(!initialValue)
  })
})
