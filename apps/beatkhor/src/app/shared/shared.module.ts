import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {GenreSelectorDialogComponent} from './genre-selector-dialog.component'
import {TagSelectorDialogComponent} from './tag-selector-dialog.component'
import {ConfirmDialogComponent} from './confirm-dialog.component'
import {NoticeComponent} from './notice.component'
import {
  GridHeaderComponent,
  GridHeaderTitleDirective,
  GridHeaderActionsDirective,
} from './grid-header.component'
import {MaterialModule} from './material.module'

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NoticeComponent,
    GridHeaderComponent,
    GridHeaderActionsDirective,
    GridHeaderTitleDirective,
    GenreSelectorDialogComponent,
    TagSelectorDialogComponent,
    NoticeComponent,
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
