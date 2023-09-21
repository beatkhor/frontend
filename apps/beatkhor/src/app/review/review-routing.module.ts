import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {ReviewComponent} from './review.component'

const routes: Routes = [
  {
    path: '',
    component: ReviewComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
