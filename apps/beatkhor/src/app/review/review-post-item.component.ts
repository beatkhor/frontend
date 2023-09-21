import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'
import {Post} from '../core/models/post'

import {UtilsService} from '../core/services/utils.service'
import {ReviewService} from '../core/services/review.service'
import {Review} from '../core/models/review'
import {lastValueFrom} from 'rxjs'
import {CustomErrorHandler} from '../core/services/error-handler.service'

@Component({
  selector: 'bk-review-post-item',
  template: ` <div class="flex items-center py-6">
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
            <mat-icon [class.text-primary-500]="currentVote === -1">thumb_down</mat-icon>
          </button>
          <button mat-icon-button (click)="onVote(1)">
            <mat-icon [class.text-primary-500]="currentVote === 1">thumb_up</mat-icon>
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
export class ReviewPostItemComponent implements OnChanges {
  @Input() post!: Post
  @Input() myReviews: Review[] = []
  currentVote!: number | undefined
  @Output() voteChange = new EventEmitter()

  loading = false

  constructor(
    private utilsService: UtilsService,
    private reviewService: ReviewService,
    private errHandler: CustomErrorHandler
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['myReviews'].currentValue != changes['myReviews'].previousValue) {
      this.setCurrentVote()
    }
  }

  get userFullName() {
    return this.utilsService.getFullName(this.post?.user)
  }

  setCurrentVote(value?: number) {
    if (value) {
      this.currentVote = value
      return
    }

    const found = this.myReviews.filter(r => r.post_id === this.post.id)
    if (found.length) {
      this.currentVote = found[0].vote
      console.log(this.currentVote)
    }
  }

  async onVote(value: number): Promise<void> {
    this.loading = true
    const found = this.myReviews.filter(r => r.post_id === this.post.id)

    const review: Review = {
      post_id: this.post.id,
      vote: value,
    }

    if (found.length) {
      try {
        await lastValueFrom(this.reviewService.deleteReview(this.post.id))
      } catch (error) {
        this.loading = false
        console.log(error)
      }

      if (value === found[0].vote) {
        this.currentVote = undefined
        this.voteChange.emit()
        this.loading = false
        return
      }
    }

    try {
      await lastValueFrom(this.reviewService.createReview(review))
      this.setCurrentVote(value)
      this.voteChange.emit()
      this.loading = false
    } catch (error: any) {
      this.errHandler.handle(error)
    }
  }
}
