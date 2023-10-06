import {environment} from '@environments/environment'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {CustomResponse, PostReviewDTO} from '@beatkhor/models'

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

  deleteVote(postId: number) {
    return this.http.delete<CustomResponse<void>>(
      environment.contentServiceURL + '/votes/' + postId
    )
  }
}
