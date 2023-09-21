import {Component, OnInit} from '@angular/core'
import {forkJoin, lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../core/services/error-handler.service'
import {ReviewService} from '../core/services/review.service'
import {Post} from '../core/models/post'
import {Review} from '../core/models/review'

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
      <mat-spinner [diameter]="45" ]></mat-spinner>
    </div>

    <ng-container *ngIf="!loading">
      <ng-container
        *ngFor="let post of posts | paginate : {itemsPerPage: 10, currentPage: p}"
      >
        <bk-review-post-item
          [post]="post"
          [myReviews]="myReviews"
          (voteChange)="getReviews()"
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
  myReviews: Review[] = []
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

  async getData(): Promise<void> {
    try {
      this.loading = true
      const result = await lastValueFrom(
        forkJoin([this.reviewService.getReviewPosts(), this.reviewService.getMyReviews()])
      )

      if (result[0]) {
        this.posts = result[0].result
      }

      if (result[1]) {
        this.myReviews = result[1].result
      }
      this.loading = false
    } catch (error: any) {
      this.errHandler.handle(error)
    }
  }

  async getReviews(): Promise<void> {
    try {
      const result = await lastValueFrom(this.reviewService.getMyReviews())
      this.myReviews = result.result
    } catch (error: any) {
      this.loading = false
      this.errHandler.handle(error)
    }
  }
}
