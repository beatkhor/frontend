import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {BrowseViewComponent} from './browse-view'
import {TrackViewComponent} from './track-view'
import {RouteData} from '@workspace/models'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BrowseViewComponent,
  },
  {
    path: 'track/:link',
    component: TrackViewComponent,
    data: {title: 'Track'} as RouteData,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseRoutingModule {}
