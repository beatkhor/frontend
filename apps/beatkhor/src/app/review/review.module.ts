import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {ReviewRoutingModule} from './review-routing.module'
import {SharedModule} from '../shared/shared.module'
import {ReviewComponent} from './review.component'

@NgModule({
  declarations: [ReviewComponent],
  imports: [CommonModule, SharedModule, ReviewRoutingModule],
})
export class ReviewModule {}
