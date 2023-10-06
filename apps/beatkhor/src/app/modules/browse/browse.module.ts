import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {BrowseRoutingModule} from './browse-routing.module'
import {SharedModule} from '../../shared/shared.module'
import {BrowseViewComponent} from './browse-view'
import {FiltersComponent} from './browse-view/filters'
import {TrackViewComponent} from './track-view'
import {PostComponent} from './track-view/post'

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
