import {FormsModule} from '@angular/forms'
import {NgModule} from '@angular/core'

import {MatFormFieldModule} from '@angular/material/form-field'
import {MatDialogModule} from '@angular/material/dialog'
import {MatListModule} from '@angular/material/list'

import {MultiSelectorDialogComponent} from './multi-selector-dialog.component'

@NgModule({
  declarations: [MultiSelectorDialogComponent],
  imports: [FormsModule, MatFormFieldModule, MatListModule, MatDialogModule],
  exports: [MultiSelectorDialogComponent],
})
export class MultiSelectorDialogModule {}
