import {Component, OnInit} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../core/services/error-handler.service'
import {ReviewService} from '../core/services/review.service'
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

    <ng-container *ngFor="let post of posts">
      <bk-review-post-item [post]="post"></bk-review-post-item>
      <mat-divider></mat-divider>
    </ng-container>
  </div>`,
})
export class ReviewComponent implements OnInit {
  posts: Post[] = []
  loading = false

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
      const result = await lastValueFrom(this.reviewService.getReviewPosts())
      this.posts = result.result
      this.loading = false
    } catch (error: any) {
      this.loading = false
      this.errHandler.handle(error)
    }
  }
}
