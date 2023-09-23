import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {ConfirmDialogComponent} from './confirm-dialog'

import {MultiSelectorDialogModule} from './multi-selector-dialog'
import {DownloadLinkPipe} from './pipes/download-link.pipe'
import {PostLinkPipe} from './pipes/post-link.pipe'
import {UserNamePipe} from './pipes/user-name.pipe'
import {MaterialModule} from './material.module'
import {GridHeaderModule} from './grid-header'
import {NoticeComponent} from './notice'

@NgModule({
  declarations: [
    PostLinkPipe,
    UserNamePipe,
    NoticeComponent,
    DownloadLinkPipe,
    ConfirmDialogComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    GridHeaderModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MultiSelectorDialogModule,
  ],
  exports: [
    FormsModule,
    PostLinkPipe,
    UserNamePipe,
    MaterialModule,
    NoticeComponent,
    DownloadLinkPipe,
    GridHeaderModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class SharedModule {}
