import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {TrackViewComponent} from './track-view'

const routes: Routes = [
  {
    path: 'track/:link',
    component: TrackViewComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseRoutingModule {}
