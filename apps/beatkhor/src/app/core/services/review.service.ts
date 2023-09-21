import {environment} from '@environments/environment'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {CustomResponse} from '../models/response'
import {Post} from '../models/post'

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviewPosts(): Observable<CustomResponse<Post[]>> {
    return this.http.get<CustomResponse<Post[]>>(
      environment.contentServiceURL + '/review/posts'
    )
  }
}
