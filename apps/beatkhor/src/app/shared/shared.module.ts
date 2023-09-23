import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {ConfirmDialogComponent} from './confirm-dialog'

import {NoticeComponent} from './components/notice.component'
import {
  GridHeaderComponent,
  GridHeaderTitleDirective,
  GridHeaderActionsDirective,
} from './components/grid-header.component'
import {MaterialModule} from './material.module'
import {PostLinkPipe} from './pipes/post-link.pipe'
import {UserNamePipe} from './pipes/user-name.pipe'
import {DownloadLinkPipe} from './pipes/download-link.pipe'
import {MultiSelectorDialogComponent} from './multi-selector-dialog'

@NgModule({
  declarations: [
    NoticeComponent,
    GridHeaderComponent,
    GridHeaderActionsDirective,
    GridHeaderTitleDirective,

    PostLinkPipe,
    UserNamePipe,
    DownloadLinkPipe,

    ConfirmDialogComponent,
    MultiSelectorDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NoticeComponent,
    GridHeaderComponent,
    GridHeaderActionsDirective,
    GridHeaderTitleDirective,
    PostLinkPipe,
    DownloadLinkPipe,
    UserNamePipe,
    NgxPaginationModule,
  ],
})
export class SharedModule {}
