import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {IndexRoutingModule} from './index-routing.module'
import {SharedModule} from '../shared/shared.module'

import {HeaderComponent} from './header.component'
import {IndexViewComponent} from './index-view'

@NgModule({
  declarations: [IndexViewComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, IndexRoutingModule],
})
export class IndexModule {}
