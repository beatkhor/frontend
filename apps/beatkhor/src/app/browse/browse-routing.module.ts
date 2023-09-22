import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {TrackComponent} from './track.component'

const routes: Routes = [
  {
    path: 'track/:link',
    component: TrackComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseRoutingModule {}
