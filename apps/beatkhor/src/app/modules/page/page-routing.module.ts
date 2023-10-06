import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {PageViewComponent} from './page-view'

const routes: Routes = [
  {
    path: ':key',
    component: PageViewComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
