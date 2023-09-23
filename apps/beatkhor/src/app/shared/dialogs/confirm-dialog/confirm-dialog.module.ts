import {NgModule} from '@angular/core'

import {MatDialogModule} from '@angular/material/dialog'

import {ConfirmDialogComponent} from './confirm-dialog.component'

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [MatDialogModule],
  exports: [ConfirmDialogComponent]
})
export class ConfirmDialogModule {}
