import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {ConfirmDialogComponent} from './confirm-dialog.component'
import {MaterialModule} from './material.module'
import {NoticeComponent} from './notice.component'
import {
  GridHeaderActionsDirective,
  GridHeaderComponent,
  GridHeaderTitleDirective,
} from './grid-header.component'

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NoticeComponent,
    GridHeaderComponent,
    GridHeaderActionsDirective,
    GridHeaderTitleDirective,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NoticeComponent,
    GridHeaderComponent,
    GridHeaderActionsDirective,
    GridHeaderTitleDirective,
  ],
})
export class SharedModule {}
