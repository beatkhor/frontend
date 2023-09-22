import {Component, EventEmitter, Input, Output} from '@angular/core'
import {Post} from '../core/models/post'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../core/services/error-handler.service'
import {ReviewService} from '../core/services/review.service'
import {UtilsService} from '../core/services/utils.service'
import {Review} from '../core/models/review'

@Component({
  selector: 'bk-review-post-item',
  template: ` <div class="flex items-center py-6">
    <div>
      <img
        *ngIf="post.pictures.length"
        class="w-32 rounded me-5"
        [src]="post.pictures[0].default | downloadLink"
        alt="Pic"
      />
    </div>
    <div class="flex flex-grow flex-col items-stretch">
      <div class="flex justify-between items-end mb-4">
        <div class="flex flex-col">
          <div>{{ post.post_meta.title }}</div>
          <div class="text-sm text-neutral-300">
            {{ post.post_meta.overridden_artist_name || userFullName }}
          </div>
        </div>

        <div class="flex items-center">
          <mat-spinner class="mr-4" *ngIf="loading" [diameter]="30"></mat-spinner>
          <button mat-icon-button (click)="onVote(-1)">
            <mat-icon [class.text-primary-500]="vote === -1">thumb_down</mat-icon>
          </button>
          <button mat-icon-button (click)="onVote(1)">
            <mat-icon [class.text-primary-500]="vote === 1">thumb_up</mat-icon>
          </button>
        </div>
      </div>

      <audio
        class="w-full"
        controls
        preload="none"
        [src]="post.audios[0].original | downloadLink"
      ></audio>
    </div>
  </div>`,
})
export class ReviewPostItemComponent {
  @Output() voteChange = new EventEmitter()
  @Input() vote: number | undefined
  @Input() post!: Post
  loading = false

  constructor(
    private utilsService: UtilsService,
    private reviewService: ReviewService,
    private errHandler: CustomErrorHandler
  ) {}

  get userFullName() {
    return this.utilsService.getFullName(this.post?.user)
  }

  async onVote(value: number): Promise<void> {
    this.loading = true

    if (this.vote) {
      try {
        await lastValueFrom(this.reviewService.deleteReview(this.post.id))
      } catch (error: any) {
        this.loading = false
        this.errHandler.handle(error)
        return
      }

      // if the value of the vote was the same as original, do nothing after deleting
      if (value === this.vote) {
        this.voteChange.emit({post_id: this.post.id, vote: undefined})
        this.loading = false
        return
      }
    }

    const review: Review = {
      post_id: this.post.id,
      vote: value,
    }

    try {
      await lastValueFrom(this.reviewService.createReview(review))
      this.voteChange.emit({post_id: this.post.id, vote: value})
      this.loading = false
    } catch (error: any) {
      this.errHandler.handle(error)
      this.loading = false
    }
  }
}
