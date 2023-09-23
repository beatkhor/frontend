import {NgModule} from '@angular/core'

import { MatIconModule } from '@angular/material/icon'

import {NoticeComponent} from './notice.component'

@NgModule({
  declarations: [NoticeComponent],
  imports: [MatIconModule],
  exports: [NoticeComponent],
})
export class NoticeModule {}
