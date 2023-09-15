import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {ConfirmDialogComponent} from './dialogs/confirm-dialog'
import {MaterialModule} from './material/material.module'

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
