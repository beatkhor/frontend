import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {RouterModule} from '@angular/router'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {AUTH_SERVICE_URL_CONFIG, AuthService} from '@workspace/services/auth.service'
import {
  LocalStorageService,
  LOCAL_STORAGE_SERVICE_PREFIX_CONFIG,
} from '@workspace/services/local-storage.service'

import {WrapperComponent} from './components/wrapper'
import {FooterComponent} from './components/footer'
import {NavbarComponent} from './components/navbar'

import {TokenInterceptor} from './interceptors/token-interceptor'

import {SharedModule} from '@shared/shared.module'
import {environment} from '@environments/environment'

@NgModule({
  declarations: [NavbarComponent, WrapperComponent, FooterComponent],
  imports: [SharedModule, CommonModule, HttpClientModule, RouterModule],
  providers: [
    AuthService,
    {
      provide: AUTH_SERVICE_URL_CONFIG,
      useValue: environment.authServiceURL,
    },
    LocalStorageService,
    {
      provide: LOCAL_STORAGE_SERVICE_PREFIX_CONFIG,
      useValue: environment.storageKeyPrefix,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  exports: [NavbarComponent, WrapperComponent],
})
export class CoreModule {}
