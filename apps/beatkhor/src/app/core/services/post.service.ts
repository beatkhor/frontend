import {environment} from '@environments/environment'

import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {CustomResponse, PaginatedResponse} from '../models/response'
import {SearchPostFilters} from '../models/search-filter'
import {Post} from '../models/post'

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  generateFullName(p: Post | undefined): string {
    if (!p) {
      return 'N/A'
    }

    if (p.post_meta.overridden_artist_name) {
      return (
        p.post_meta.overridden_artist_name +
        ' - ' +
        p?.post_meta.title +
        $localize` cover art`
      )
    }

    let title = p?.user?.first_name ?? ''
    title += ' ' + p?.user?.last_name || ''
    title += ' - ' + p?.post_meta.title || ''
    title += $localize` cover art`
    return title
  }

  createPost(post: Post): Observable<CustomResponse<Post>> {
    return this.http.post<CustomResponse<Post>>(
      environment.contentServiceURL + '/posts',
      post
    )
  }

  updatePost(post: Post): Observable<CustomResponse<Post>> {
    return this.http.patch<CustomResponse<Post>>(
      environment.contentServiceURL + '/posts/' + post.id,
      post
    )
  }

  getPostByLink(link: string): Observable<CustomResponse<Post>> {
    return this.http.get<CustomResponse<Post>>(
      environment.contentServiceURL + '/posts/' + encodeURI(link)
    )
  }

  deletePost(postId: number): Observable<CustomResponse<any>> {
    return this.http.delete<CustomResponse<any>>(
      environment.contentServiceURL + '/posts/' + postId
    )
  }

  getPosts(pageSize = 10, page = 1, query = ''): Observable<PaginatedResponse<Post[]>> {
    const params = {
      page_size: pageSize,
      q: query,
      page,
    }
    return this.http.get<PaginatedResponse<Post[]>>(
      environment.contentServiceURL + '/posts',
      {params}
    )
  }

  getUserPosts(
    username: string,
    pageSize = 10,
    page = 1,
    query = ''
  ): Observable<PaginatedResponse<Post[]>> {
    const params = {
      page_size: pageSize,
      q: query,
      page,
    }
    return this.http.get<PaginatedResponse<Post[]>>(
      environment.contentServiceURL + '/posts/@' + username,
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
      environment.contentServiceURL + '/posts/search',
      {params}
    )
  }
}
