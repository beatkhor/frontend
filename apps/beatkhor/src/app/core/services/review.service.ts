import {environment} from '@environments/environment'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {CustomResponse} from '../models/response'
import {Review} from '../models/review'
import {Post} from '../models/post'

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getMyReviews(): Observable<CustomResponse<Review[]>> {
    return this.http.get<CustomResponse<Review[]>>(
      environment.contentServiceURL + '/review/me'
    )
  }

  getReviewPosts(): Observable<CustomResponse<Post[]>> {
    return this.http.get<CustomResponse<Post[]>>(
      environment.contentServiceURL + '/review/posts'
    )
  }

  createReview(review: Review): Observable<CustomResponse<Review>> {
    return this.http.post<CustomResponse<Review>>(
      environment.contentServiceURL + '/review ',
      review
    )
  }

  deleteReview(postId?: number, parent?: number): Observable<CustomResponse<any>> {
    const params: any = {}
    if (postId) {
      params['post_id'] = String(postId)
    }
    if (parent) {
      params['parent'] = String(parent)
    }

    return this.http.delete<CustomResponse<any>>(
      environment.contentServiceURL + '/review',
      {
        params,
      }
    )
  }
}
