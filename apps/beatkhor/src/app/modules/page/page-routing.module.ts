import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {PageViewComponent} from './page-view'
import {RouteData} from '@workspace/models'

const routes: Routes = [
  {
    path: ':key',
    component: PageViewComponent,
    data: {title: $localize`Page`} as RouteData,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
