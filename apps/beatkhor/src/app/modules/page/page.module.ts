import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {PageRoutingModule} from './page-routing.module'
import {PageViewComponent} from './page-view'

import {SharedModule} from '@shared/shared.module'

@NgModule({
  declarations: [PageViewComponent],
  imports: [CommonModule, SharedModule, PageRoutingModule],
})
export class PageModule {}
