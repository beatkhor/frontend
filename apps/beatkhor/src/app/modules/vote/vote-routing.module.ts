import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {VoteComponent} from './vote-view/vote-view.component'

const routes: Routes = [
  {
    path: '',
    component: VoteComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoteRoutingModule {}
