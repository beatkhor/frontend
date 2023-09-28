import {environment} from '@environments/environment'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {CustomResponse} from '../models/response'
import {PostReviewDTO} from '../models/review'

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private http: HttpClient) {}

  upVote(postId: number) {
    return this.http.post<CustomResponse<void>>(
      environment.contentServiceURL + '/votes/upvote/' + postId,
      null
    )
  }

  downVote(postId: number) {
    return this.http.post<CustomResponse<void>>(
      environment.contentServiceURL + '/votes/downvote/' + postId,
      null
    )
  }

  getVotePosts(): Observable<CustomResponse<PostReviewDTO>> {
    return this.http.get<CustomResponse<PostReviewDTO>>(
      environment.contentServiceURL + '/votes/posts'
    )
  }
}
