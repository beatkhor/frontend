import {NgModule} from '@angular/core'

import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {CommonModule} from '@angular/common'

import {NoticeComponent} from './notice.component'

@NgModule({
  declarations: [NoticeComponent],
  imports: [MatIconModule, CommonModule, MatButtonModule],
  exports: [NoticeComponent],
})
export class NoticeModule {}
