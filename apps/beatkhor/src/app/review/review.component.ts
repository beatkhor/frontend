import {Component, OnInit} from '@angular/core'
import {forkJoin, lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../core/services/error-handler.service'
import {ReviewService} from '../core/services/review.service'
import {Review} from '../core/models/review'
import {Post} from '../core/models/post'

@Component({
  selector: 'bk-review',
  template: `<div class="container mx-auto px-5 py-6">
    <bk-gird-header>
      <div bk-section-divider-title>
        <h2>Review Tracks</h2>
      </div>

      <div bk-section-divider-actions (click)="getData()">
        <button mat-stroked-button>Refresh</button>
      </div>
    </bk-gird-header>

    <div *ngIf="loading" class="flex justify-center py-4">
      <mat-spinner [diameter]="45"></mat-spinner>
    </div>

    <ng-container *ngIf="!loading">
      <ng-container
        *ngFor="let post of posts | paginate : {itemsPerPage: 10, currentPage: p}"
      >
        <bk-review-post-item
          [post]="post"
          [vote]="getPostReview(post)"
          (voteChange)="onVoteChange($event)"
        ></bk-review-post-item>
        <mat-divider></mat-divider>
      </ng-container>
      <div class="flex justify-center py-4">
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
      </div>
    </ng-container>
  </div>`,
})
export class ReviewComponent implements OnInit {
  postReviews = new Map<number, number | undefined>()
  reviews: Review[] = []
  posts: Post[] = []
  loading = false
  p: number = 1

  constructor(
    private reviewService: ReviewService,
    private errHandler: CustomErrorHandler
  ) {}

  ngOnInit(): void {
    this.getData()
  }

  getPostReview(post: Post): number | undefined {
    return this.postReviews.get(post.id ?? 0)
  }

  async getData(): Promise<void> {
    try {
      this.loading = true
      const result = await lastValueFrom(this.reviewService.getReviewPosts())

      this.posts = result.result.posts
      this.reviews = result.result.user_reviews

      for (const post of this.posts) {
        const found = this.reviews.filter(r => r.post_id === post.id)
        if (found.length) {
          this.postReviews.set(post.id ?? 0, found[0].vote)
        }
      }

      this.loading = false
    } catch (error: any) {
      this.errHandler.handle(error)
    }
  }

  onVoteChange(event: any) {
    this.postReviews.set(event.post_id, event.vote)
  }
}
