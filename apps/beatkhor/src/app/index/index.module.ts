import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {IndexRoutingModule} from './index-routing.module'
import {SharedModule} from '../shared/shared.module'
import {HeaderComponent} from './header.component'
import {IndexComponent} from './index.component'

@NgModule({
  declarations: [IndexComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, IndexRoutingModule],
})
export class IndexModule {}
