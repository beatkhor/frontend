import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {VotePostItemComponent} from './vote-post-item.component'
import {VoteComponent} from './vote-view/vote-view.component'
import {VoteRoutingModule} from './vote-routing.module'
import {SharedModule} from '../shared/shared.module'

@NgModule({
  declarations: [VoteComponent, VotePostItemComponent],
  imports: [CommonModule, SharedModule, VoteRoutingModule],
})
export class VoteModule {}
