import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {IndexViewComponent} from './index-view/index-view.component'

const routes: Routes = [
  {
    path: '',
    component: IndexViewComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
