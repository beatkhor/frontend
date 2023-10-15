import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core'
import {Subscription, lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '@workspace/services/error-handler.service'
import {UtilsService} from '@workspace/services/utils.service'
import {PostService} from '@workspace/services/post.service'
import {SEOService} from '@workspace/services/seo.service'
import {environment} from '@environments/environment'
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

  constructor(
    private seoService: SEOService,
    private postService: PostService,
    private errHandler: CustomErrorHandler,
    @Inject(LOCALE_ID) public localeId: string
  ) {}

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
      this.buildTitle()
      this.loading = false
    } catch (error: any) {
      this.loading = false
      this.errHandler.handle(error)
    }
  }

  private buildTitle() {
    const separator = this.localeId === 'fa' ? 'و ' : ', '
    const genresString = this.filters.genres?.map(g => g.title).join(separator)
    const title = $localize`Browse ` + genresString + $localize` beats`
    this.seoService.setTitle(
      title + environment.seo.titleSeparator + environment.seo.title
    )
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
