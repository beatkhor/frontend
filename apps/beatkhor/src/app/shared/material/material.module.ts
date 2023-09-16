import {NgModule} from '@angular/core'

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list'
import {MatMenuModule} from '@angular/material/menu'

const modules = [
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatTooltipModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
]

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
