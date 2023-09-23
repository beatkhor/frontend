import {FormsModule} from '@angular/forms'
import {NgModule} from '@angular/core'

import {MultiSelectorDialogComponent} from './multi-selector-dialog.component'
import {MaterialModule} from '../material.module'

@NgModule({
  declarations: [MultiSelectorDialogComponent],
  imports: [MaterialModule, FormsModule],
  exports: [MultiSelectorDialogComponent],
})
export class MultiSelectorDialogModule {}
