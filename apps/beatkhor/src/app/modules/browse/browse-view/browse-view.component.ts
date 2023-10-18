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
      this.setupSEO()
      this.loading = false
    } catch (error: any) {
      this.loading = false
      this.errHandler.handle(error)
    }
  }

  private setupSEO() {
    const separator = this.localeId === 'fa' ? ' و ' : ', '
    const genresString = this.filters.genres
      ?.map(g => (this.localeId === 'fa' ? g.title_fa : g.title))
      .join(separator)

    const tagsString = this.filters.tags
      ?.map(t => (this.localeId === 'fa' ? t.title_fa : t.title))
      .join(separator)

    const extras = genresString?.length ? genresString : tagsString
    const title = $localize`Browse ` + extras + $localize` beats`

    this.seoService.updateMeta({
      title: title + environment.seo.titleSeparator + environment.seo.title,
      description: $localize`Discover a diverse collection of beats from talented artists across genres. Filter by genre, mood, tempo, and more to find the perfect beat for your creative project. Explore our curated selection today`,
      noIndex: !environment.production,
      image: environment.seo.openGraph.image,
      keywords: $localize`Search for Beats, Browse Beats Catalog, Genre-Specific Beats, Royalty-Free Beats, Find the Perfect Beat, Musical Discovery, Music Instrumentals`,
    })

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
