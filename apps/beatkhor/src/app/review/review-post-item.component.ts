import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../core/services/error-handler.service'
import {VoteService} from '../core/services/review.service'
import {UtilsService} from '../core/services/utils.service'
import {PostService} from '../core/services/post.service'
import {Audio, Picture} from '../core/models/media'
import {Vote} from '../core/models/review'
import {Post} from '../core/models/post'

@Component({
  selector: 'bk-review-post-item',
  template: ` <div class="flex flex-col sm:flex-row items-stretch sm:items-end py-6">
    <div class="mr-0 sm:mr-7 mb-5 sm:mb-0">
      <img
        *ngIf="post.pictures.length"
        class="w-full sm:w-36 rounded"
        [src]="picture?.default | downloadLink"
        [alt]="alt"
      />
    </div>
    <div class="flex flex-grow flex-col items-stretch py-1 pb-2">
      <div class="flex justify-between items-end mb-4">
        <div class="flex flex-col">
          <div class="text-neutral-200 text-lg">{{ title }}</div>
          <div class="text-sm text-neutral-400">
            {{ artist }}
          </div>
        </div>

        <div class="flex items-center">
          <div class="flex bg-neutral-800 rounded items-center">
            <button mat-icon-button (click)="onDownVote()" class="!pt-2.5">
              <mat-icon [class.text-primary-500]="isDownVote" class="text-xl">
                thumb_down
              </mat-icon>
            </button>
            <button mat-icon-button (click)="onUpVote()" class="!pt-2.5">
              <mat-icon [class.text-primary-500]="isUpVote" class="text-xl">
                thumb_up
              </mat-icon>
            </button>
          </div>
        </div>
      </div>

      <bk-audio-player [src]="audio?.original | downloadLink"></bk-audio-player>
    </div>
  </div>`,
})
export class ReviewPostItemComponent implements OnInit {
  @Output() voteChange = new EventEmitter()
  @Input() vote: number | undefined
  @Input() post!: Post
  loading = false
  artist = ''
  alt = ''

  constructor(
    private postService: PostService,
    private voteService: VoteService,
    private utilsService: UtilsService,
    private errHandler: CustomErrorHandler
  ) {}

  ngOnInit(): void {
    this.alt = this.postService.generateFullName(this.post)
    this.artist = UtilsService.getArtistName(this.post)
  }

  get picture(): Picture | undefined {
    return this.post?.pictures[0]
  }

  get audio(): Audio | undefined {
    return this.post?.audios[0]
  }

  get title(): string {
    return this.post.post_meta.title
  }

  get isUpVote() {
    return false
  }

  get isDownVote() {
    return false
  }

  async onUpVote(): Promise<void> {
    if (!this.post.id) {
      return
    }

    try {
      this.loading = true
      await lastValueFrom(this.voteService.upVote(this.post.id))
      this.loading = false
    } catch (error) {
      this.loading = false
    }
  }

  async onDownVote(): Promise<void> {
    if (!this.post.id) {
      return
    }

    try {
      this.loading = true
      await lastValueFrom(this.voteService.downVote(this.post.id))
      this.loading = false
    } catch (error) {
      this.loading = false
    }
  }
}
