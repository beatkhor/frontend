import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {GenreSelectorDialogComponent} from './genre-selector-dialog.component'
import {ConfirmDialogComponent} from './confirm-dialog.component'
import {MaterialModule} from './material.module'
import {NoticeComponent} from './notice.component'

@NgModule({
  declarations: [ConfirmDialogComponent, GenreSelectorDialogComponent, NoticeComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, MaterialModule, NoticeComponent],
})
export class SharedModule {}
