import {HttpClient} from '@angular/common/http'
import {Inject, Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {
  PostReviewDTO,
  CustomResponse,
  EnvironmentConfig,
  ENVIRONMENT_CONFIG,
} from '@workspace/models'

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private config: EnvironmentConfig
  ) {}

  upVote(postId: number) {
    return this.http.post<CustomResponse<void>>(
      this.config.contentServiceUrl + '/votes/upvote/' + postId,
      null
    )
  }

  downVote(postId: number) {
    return this.http.post<CustomResponse<void>>(
      this.config.contentServiceUrl + '/votes/downvote/' + postId,
      null
    )
  }

  readVotePosts(): Observable<CustomResponse<PostReviewDTO>> {
    return this.http.get<CustomResponse<PostReviewDTO>>(
      this.config.contentServiceUrl + '/votes/posts'
    )
  }

  delete(postId: number) {
    return this.http.delete<CustomResponse<void>>(
      this.config.contentServiceUrl + '/votes/' + postId
    )
  }
}
