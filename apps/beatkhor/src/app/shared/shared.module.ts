import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {MultiSelectorDialogModule} from './dialogs/multi-selector-dialog'
import {ConfirmDialogModule} from './dialogs/confirm-dialog'

import {GridHeaderModule} from './components/grid-header'
import {NoticeModule} from './components/notice'

import {MaterialModule} from './material/material.module'
import {PipesModule} from './pipes/pipes.module'

@NgModule({
  imports: [
    FormsModule,
    PipesModule,
    NoticeModule,
    CommonModule,
    MaterialModule,
    GridHeaderModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MultiSelectorDialogModule,
  ],
  exports: [
    PipesModule,
    FormsModule,
    NoticeModule,
    MaterialModule,
    GridHeaderModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class SharedModule {}
