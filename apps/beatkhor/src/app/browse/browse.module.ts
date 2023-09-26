import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {BrowseRoutingModule} from './browse-routing.module'
import {SharedModule} from '../shared/shared.module'
import {TrackViewComponent} from './track-view'
import {PostComponent} from './shared/post'

@NgModule({
  declarations: [TrackViewComponent, PostComponent],
  imports: [CommonModule, SharedModule, BrowseRoutingModule],
})
export class BrowseModule {}
