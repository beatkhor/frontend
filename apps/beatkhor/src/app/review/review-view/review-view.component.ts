import {Component, OnInit} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../../core/services/error-handler.service'
import {ReviewService} from '../../core/services/review.service'
import {Review} from '../../core/models/review'
import {Post} from '../../core/models/post'

@Component({
  selector: 'bk-review',
  templateUrl: './review-view.component.html',
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
