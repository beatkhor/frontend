import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule} from '@angular/router'
import {NgModule} from '@angular/core'

import {SharedModule} from '@shared/shared.module'
import {CoreModule} from './core/core.module'
import {AppComponent} from './app.component'
import {appRoutes} from './app.routes'

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
