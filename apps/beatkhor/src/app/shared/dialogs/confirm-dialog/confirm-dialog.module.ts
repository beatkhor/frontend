import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'

import {ConfirmDialogComponent} from './confirm-dialog.component'

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
