import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {BrowseRoutingModule} from './browse-routing.module'
import {SharedModule} from '../shared/shared.module'

@NgModule({
  imports: [CommonModule, SharedModule, BrowseRoutingModule],
})
export class BrowseModule {}
