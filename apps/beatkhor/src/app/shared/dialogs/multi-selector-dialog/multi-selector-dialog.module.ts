import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {NgModule} from '@angular/core'

import {MatFormFieldModule} from '@angular/material/form-field'
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatListModule} from '@angular/material/list'

import {MultiSelectorDialogComponent} from './multi-selector-dialog.component'

@NgModule({
  declarations: [MultiSelectorDialogComponent],
  imports: [
    FormsModule,
    CommonModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  exports: [MultiSelectorDialogComponent],
})
export class MultiSelectorDialogModule {}
