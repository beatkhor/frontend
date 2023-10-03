import {Component} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {PostService} from '../../core/services/post.service'
import {PostFilters} from '../../core/models/search-filter'
import {Post} from '../../core/models/post'
import {CustomErrorHandler} from '../../core/services/error-handler.service'

@Component({
  selector: 'bk-browse-view',
  templateUrl: './browse-view.component.html',
})
export class BrowseViewComponent {
  posts: Post[] = []
  loading = false

  page = 1
  pageSize = 6 * 5
  totalPages = 0
  demoArr = Array(this.pageSize)

  constructor(private postService: PostService, private errHandler: CustomErrorHandler) {}

  onFiltersChange(filters: PostFilters): void {
    this.getPosts(filters)
  }

  async getPosts(filters: PostFilters) {
    const req$ = this.postService.search({
      page: this.page,
      pageSize: this.pageSize,
      genres: filters.genres,
      tags: filters.tags,
      query: filters.query,
    })

    try {
      this.loading = true
      const response = await lastValueFrom(req$)
      this.posts = response.result
      this.page = response.page
      this.totalPages = Math.ceil(response.total / response.page_size)
      this.loading = false
    } catch (error: any) {
      this.loading = false
      this.errHandler.handle(error)
    }
  }
}
