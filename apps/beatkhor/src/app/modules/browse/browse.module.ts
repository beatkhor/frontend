import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {BrowseViewComponent, FiltersComponent} from './browse-view'

import {BrowseRoutingModule} from './browse-routing.module'
import {SharedModule} from '../../shared/shared.module'
import {PostComponent} from './track-view/post'
import {TrackViewComponent} from './track-view'

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
