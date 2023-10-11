import {Inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {
  Post,
  CustomResponse,
  EnvironmentConfig,
  PaginatedResponse,
  SearchPostFilters,
  ENVIRONMENT_CONFIG,
} from '@workspace/models'

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private config: EnvironmentConfig
  ) {}

  create(post: Post): Observable<CustomResponse<Post>> {
    return this.http.post<CustomResponse<Post>>(
      this.config.contentServiceUrl + '/posts',
      post
    )
  }

  update(post: Post): Observable<CustomResponse<Post>> {
    return this.http.patch<CustomResponse<Post>>(
      this.config.contentServiceUrl + '/posts/' + post.id,
      post
    )
  }

  readByLink(link: string): Observable<CustomResponse<Post>> {
    return this.http.get<CustomResponse<Post>>(
      this.config.contentServiceUrl + '/posts/' + encodeURI(link)
    )
  }

  delete(postId: number): Observable<CustomResponse<any>> {
    return this.http.delete<CustomResponse<any>>(
      this.config.contentServiceUrl + '/posts/' + postId
    )
  }

  read(pageSize = 10, page = 1, query = ''): Observable<PaginatedResponse<Post[]>> {
    const params = {
      page_size: pageSize,
      q: query,
      page,
    }
    return this.http.get<PaginatedResponse<Post[]>>(
      this.config.contentServiceUrl + '/posts',
      {params}
    )
  }

  search(filters: SearchPostFilters): Observable<PaginatedResponse<Post[]>> {
    const genres = filters.genres?.map(g => g.slug).join(',') || ''
    const tags = filters.tags?.map(t => t.slug).join(',') || ''
    const categories = filters.categories?.map(c => c.slug).join(',') ?? ''

    const params: any = {genres, tags, categories, q: filters.query ?? ''}

    if (filters.pageSize) {
      params.page_size = filters.pageSize
    }

    if (filters.page) {
      params.page = filters.page
    }

    return this.http.get<PaginatedResponse<Post[]>>(
      this.config.contentServiceUrl + '/posts/search',
      {params}
    )
  }
}
