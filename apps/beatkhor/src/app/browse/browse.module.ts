import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {BrowseRoutingModule} from './browse-routing.module'
import {SharedModule} from '../shared/shared.module'
import {FiltersComponent} from './shared/filters'
import {BrowseViewComponent} from './browse-view'
import {TrackViewComponent} from './track-view'
import {PostComponent} from './shared/post'

@NgModule({
  declarations: [
    TrackViewComponent,
    BrowseViewComponent,
    PostComponent,
    FiltersComponent,
  ],
  imports: [CommonModule, SharedModule, BrowseRoutingModule],
})
export class BrowseModule {}
