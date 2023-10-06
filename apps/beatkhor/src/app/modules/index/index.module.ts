import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {IndexRoutingModule} from './index-routing.module'
import {SharedModule} from '../../shared/shared.module'

import {IndexHeaderComponent} from './index-header'
import {IndexViewComponent} from './index-view'

@NgModule({
  declarations: [IndexViewComponent, IndexHeaderComponent],
  imports: [CommonModule, SharedModule, IndexRoutingModule],
})
export class IndexModule {}
