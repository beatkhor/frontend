import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {ConfirmDialogComponent} from './confirm-dialog.component'
import {MaterialModule} from './material/material.module'
import {NoticeComponent} from './notice.component'

@NgModule({
  declarations: [ConfirmDialogComponent, NoticeComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, MaterialModule, NoticeComponent],
})
export class SharedModule {}
