import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {GenreSelectorDialogComponent} from './genre-selector-dialog.component'
import {TagSelectorDialogComponent} from './tag-selector-dialog.component'
import {ConfirmDialogComponent} from './confirm-dialog.component'
import {NoticeComponent} from './notice.component'
import {
  GridHeaderComponent,
  GridHeaderTitleDirective,
  GridHeaderActionsDirective,
} from './grid-header.component'
import {MaterialModule} from './material.module'
import {PostLinkPipe} from './post-link.pipe'
import {DownloadLinkPipe} from './download-link.pipe'
import {UserNamePipe} from './user-name.pipe'

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NoticeComponent,
    GridHeaderComponent,
    GridHeaderActionsDirective,
    GridHeaderTitleDirective,
    GenreSelectorDialogComponent,
    TagSelectorDialogComponent,
    NoticeComponent,
    PostLinkPipe,
    DownloadLinkPipe,
    UserNamePipe,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
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
  ],
})
export class SharedModule {}
