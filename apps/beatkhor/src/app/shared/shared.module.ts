import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {MultiSelectorDialogModule} from './dialogs/multi-selector-dialog'
import {ConfirmDialogModule} from './dialogs/confirm-dialog'

import {AudioPlayerModule} from './components/audio-player'
import {GridHeaderModule} from './components/grid-header'
import {NoticeModule} from './components/notice'

import {InfiniteScrollModule} from 'ngx-infinite-scroll'
import {MaterialModule} from './material/material.module'
import {PostModule} from './components/post/post.module'
import {PipesModule} from './pipes/pipes.module'

@NgModule({
  imports: [
    PostModule,
    FormsModule,
    PipesModule,
    NoticeModule,
    CommonModule,
    MaterialModule,
    GridHeaderModule,
    AudioPlayerModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    InfiniteScrollModule,
    MultiSelectorDialogModule,
  ],
  exports: [
    PostModule,
    PipesModule,
    FormsModule,
    NoticeModule,
    MaterialModule,
    GridHeaderModule,
    AudioPlayerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    InfiniteScrollModule,
  ],
})
export class SharedModule {}
