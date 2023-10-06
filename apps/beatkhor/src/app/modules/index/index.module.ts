import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {IndexHeaderComponent, IndexViewComponent} from './index-view'

import {IndexRoutingModule} from './index-routing.module'
import {SharedModule} from '@shared/shared.module'

@NgModule({
  declarations: [IndexViewComponent, IndexHeaderComponent],
  imports: [CommonModule, SharedModule, IndexRoutingModule],
})
export class IndexModule {}
