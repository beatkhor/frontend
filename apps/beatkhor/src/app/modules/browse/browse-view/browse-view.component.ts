import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription, lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '../../../core/services/error-handler.service'
import {UtilsService} from '../../../core/services/utils.service'
import {PostService} from '../../../core/services/post.service'
import {Post, PostFilters} from '@workspace/models'

@Component({
  selector: 'bk-browse-view',
  templateUrl: './browse-view.component.html',
})
export class BrowseViewComponent implements OnInit, OnDestroy {
  subscription!: Subscription
  filters!: PostFilters
  loadingMore = false
  posts: Post[] = []
  loading = false

  page = 1
  totalPages = 0
  pageSize = 6 * 5
  demoArr = Array(this.pageSize)

  constructor(private postService: PostService, private errHandler: CustomErrorHandler) {}

  ngOnInit(): void {
    this.handleScroll()
  }

  private handleScroll() {
    this.subscription = UtilsService.contentScrollToEnd$.subscribe(() => {
      this.loadMore()
    })
  }

  onFiltersChange(filters: PostFilters): void {
    this.filters = filters
    this.page = 1
    this.getPosts()
  }

  private async getPosts() {
    const req$ = this.postService.search({
      page: this.page,
      pageSize: this.pageSize,
      genres: this.filters.genres,
      tags: this.filters.tags,
      query: this.filters.query,
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

  async loadMore() {
    if (!this.subscription || this.subscription.closed) {
      this.handleScroll()
    }

    const req$ = this.postService.search({
      page: ++this.page,
      pageSize: this.pageSize,
      genres: this.filters.genres,
      tags: this.filters.tags,
      query: this.filters.query,
    })

    if (this.page >= this.totalPages) {
      return
    }

    try {
      this.loadingMore = true
      const response = await lastValueFrom(req$)
      this.posts.push(...response.result)
      this.page = response.page
      this.totalPages = Math.ceil(response.total / response.page_size)
      this.loadingMore = false
    } catch (error: any) {
      this.loadingMore = false
      this.errHandler.handle(error)
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
