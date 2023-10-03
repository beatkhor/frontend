import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {PageRoutingModule} from './page-routing.module'
import {SharedModule} from '../shared/shared.module'
import {PageViewComponent} from './page-view'

@NgModule({
  declarations: [PageViewComponent],
  imports: [CommonModule, SharedModule, PageRoutingModule],
})
export class PageModule {}
