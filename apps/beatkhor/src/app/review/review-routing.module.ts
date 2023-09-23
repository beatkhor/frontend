import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {ReviewComponent} from './review-view/review-view.component'

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
