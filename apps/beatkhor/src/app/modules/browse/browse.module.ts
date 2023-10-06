import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {BrowseViewComponent, FiltersComponent} from './browse-view'
import {TrackViewComponent, PostComponent} from './track-view'

import {BrowseRoutingModule} from './browse-routing.module'
import {SharedModule} from '@shared/shared.module'

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
